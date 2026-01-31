import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import PreProfileLayout from '../PreProfile/PreProfileLayout';
import { quickScanService, QuickScan } from '../../services/quickScanService';
import { supabase } from '../../services/supabase';

const QuickScanPreProfile: React.FC = () => {
  const navigate = useNavigate();
  const { scanId } = useParams<{ scanId: string }>();

  
  const [scanData, setScanData] = useState<QuickScan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [lastKnownAddress, setLastKnownAddress] = useState<string>('');
  const [relatives, setRelatives] = useState<string>('');
  const [aliases, setAliases] = useState<string>('');
  const [companies, setCompanies] = useState<string>('');
  const [emails, setEmails] = useState<any[]>([]);
  const [additionalAddresses, setAdditionalAddresses] = useState<any[]>([]);
  const [additionalPhones, setAdditionalPhones] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any[]>([]);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [expandedContainers, setExpandedContainers] = useState({
    security: false,
    fraud: false,
    spam: false
  });
  const [selectedTab, setSelectedTab] = useState(0);


  useEffect(() => {
    if (!scanId) {
      navigate('/quick-scan');
      return;
    }

    loadScanData();
  }, [scanId, navigate]);

  const loadScanData = async () => {
    if (!scanId) return;

    setLoading(true);
    try {
      // Load scan info and calculate risk counts
      const scanResponse = await quickScanService.getQuickScan(scanId);

      if (scanResponse.error) {
        setError(scanResponse.error);
        return;
      }

      const scanData = scanResponse.data;
      
      // Calculate risk counts from database
      let breachCount = 0;
      let fraudRiskCount = 0;
      let spamRiskCount = 0;
      let totalExposureCount = 0;

      if (scanData?.id) {
        // Get breach count
        const { data: breachesData } = await supabase
          .from('qs_breaches')
          .select('id')
          .eq('profile_id', scanData.id);

        breachCount = breachesData?.length || 0;

        // Get all data counts (relatives, addresses, phones, jobs, emails, aliases)
        const [relativesData, addressesData, phonesData, jobsData, emailsData, aliasesData] = await Promise.all([
          supabase.from('qs_relatives').select('id').eq('profile_id', scanData.id),
          supabase.from('qs_addresses').select('id').eq('profile_id', scanData.id),
          supabase.from('qs_phones').select('id').eq('profile_id', scanData.id),
          supabase.from('qs_jobs').select('id').eq('profile_id', scanData.id),
          supabase.from('qs_emails').select('id').eq('profile_id', scanData.id),
          supabase.from('qs_aliases').select('id').eq('profile_id', scanData.id)
        ]);

        fraudRiskCount = (relativesData.data?.length || 0) + 
                        (addressesData.data?.length || 0) + 
                        (phonesData.data?.length || 0) + 
                        (jobsData.data?.length || 0);

        spamRiskCount = (emailsData.data?.length || 0) + 
                       (aliasesData.data?.length || 0);

        totalExposureCount = fraudRiskCount + spamRiskCount + breachCount;

        // Fetch phone number
        console.log('🔍 Fetching phone numbers for profile:', scanData.id);
        const { data: phoneNumbersData, error: phoneError } = await supabase
          .from('qs_phones')
          .select('phone_number, type, primary')
          .eq('profile_id', scanData.id)
          .order('primary', { ascending: false }); // Primary phones first

        console.log('📞 Phone query result:', { phoneNumbersData, phoneError });

        if (phoneNumbersData && phoneNumbersData.length > 0) {
          console.log('📞 Found phone numbers:', phoneNumbersData);
          // Look for mobile primary first, then any primary, then any mobile, then any number
          const mobilePrimary = phoneNumbersData.find(phone => phone.primary && phone.type === 'mobile');
          const anyPrimary = phoneNumbersData.find(phone => phone.primary);
          const anyMobile = phoneNumbersData.find(phone => phone.type === 'mobile');
          const anyNumber = phoneNumbersData[0];

          const selectedPhone = mobilePrimary || anyPrimary || anyMobile || anyNumber;
          console.log('📞 Selected phone:', selectedPhone);
          setPhoneNumber(selectedPhone.phone_number);
        } else {
          console.log('📞 No phone numbers found');
          setPhoneNumber('');
        }

        // Fetch last known address
        console.log('🏠 Fetching last known address for profile:', scanData.id);
        const { data: addressData, error: addressError } = await supabase
          .from('qs_addresses')
          .select('street, city, state, zip')
          .eq('profile_id', scanData.id)
          .eq('is_last_known', true)
          .single();

        console.log('🏠 Address query result:', { addressData, addressError });

        if (addressData) {
          const addressLines = [];
          if (addressData.street) addressLines.push(addressData.street);
          if (addressData.city && addressData.state && addressData.zip) {
            addressLines.push(`${addressData.city}, ${addressData.state} ${addressData.zip}`);
          } else if (addressData.city && addressData.state) {
            addressLines.push(`${addressData.city}, ${addressData.state}`);
          }
          setLastKnownAddress(addressLines.join('\n'));
        } else {
          console.log('🏠 No last known address found');
          setLastKnownAddress('');
        }

        // Fetch relatives
        console.log('👥 Fetching relatives for profile:', scanData.id);
        const { data: relativesListData, error: relativesError } = await supabase
          .from('qs_relatives')
          .select('relative_name')
          .eq('profile_id', scanData.id);

        console.log('👥 Relatives query result:', { relativesListData, relativesError });

        if (relativesListData && relativesListData.length > 0) {
          const relativesList = relativesListData.map(relative => relative.relative_name).join(', ');
          console.log('👥 Found relatives:', relativesList);
          setRelatives(relativesList);
        } else {
          console.log('👥 No relatives found');
          setRelatives('');
        }

        // Fetch aliases
        console.log('🏷️ Fetching aliases for profile:', scanData.id);
        const { data: aliasesListData, error: aliasesError } = await supabase
          .from('qs_aliases')
          .select('alias')
          .eq('profile_id', scanData.id);

        console.log('🏷️ Aliases query result:', { aliasesListData, aliasesError });

        if (aliasesListData && aliasesListData.length > 0) {
          const aliasesList = aliasesListData.map(alias => alias.alias).join(', ');
          console.log('🏷️ Found aliases:', aliasesList);
          setAliases(aliasesList);
        } else {
          console.log('🏷️ No aliases found');
          setAliases('');
        }

        // Fetch companies
        console.log('🏢 Fetching companies for profile:', scanData.id);
        const { data: companiesListData, error: companiesError } = await supabase
          .from('qs_jobs')
          .select('company')
          .eq('profile_id', scanData.id)
          .not('company', 'is', null); // Filter out null companies

        console.log('🏢 Companies query result:', { companiesListData, companiesError });

        if (companiesListData && companiesListData.length > 0) {
          const companiesList = companiesListData.map(job => job.company).join(', ');
          console.log('🏢 Found companies:', companiesList);
          setCompanies(companiesList);
        } else {
          console.log('🏢 No companies found');
          setCompanies('');
        }

        // Fetch emails
        console.log('📧 Fetching emails for profile:', scanData.id);
        const { data: emailsListData, error: emailsError } = await supabase
          .from('qs_emails')
          .select('email_address')
          .eq('profile_id', scanData.id);

        console.log('📧 Emails query result:', { emailsListData, emailsError });
        setEmails(emailsListData || []);

        // Fetch additional addresses (not last known)
        console.log('🏠 Fetching additional addresses for profile:', scanData.id);
        const { data: additionalAddressesData, error: additionalAddressesError } = await supabase
          .from('qs_addresses')
          .select('street, city, state, zip')
          .eq('profile_id', scanData.id)
          .eq('is_last_known', false)
          .limit(2);

        console.log('🏠 Additional addresses query result:', { additionalAddressesData, additionalAddressesError });
        setAdditionalAddresses(additionalAddressesData || []);

        // Fetch additional phones
        console.log('📞 Fetching additional phones for profile:', scanData.id);
        const { data: additionalPhonesData, error: additionalPhonesError } = await supabase
          .from('qs_phones')
          .select('phone_number, type')
          .eq('profile_id', scanData.id)
          .limit(5);

        console.log('📞 Additional phones query result:', { additionalPhonesData, additionalPhonesError });
        setAdditionalPhones(additionalPhonesData || []);
      }

      // Update scan data with calculated counts
      const updatedScanData = {
        ...scanData,
        breach_count: breachCount,
        fraud_risk_count: fraudRiskCount,
        spam_risk_count: spamRiskCount,
        total_exposure_count: totalExposureCount
      };

      setScanData(updatedScanData);
    } catch (err) {
      console.error('Error loading scan data:', err);
      setError('Failed to load scan data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleShowMore = async (dataType: string) => {
    if (!scanData?.id) return;

    let query;
    let title;
    
    if (dataType === 'emails') {
      query = supabase.from('qs_emails').select('email_address').eq('profile_id', scanData.id);
      title = 'Email Addresses';
    } else if (dataType === 'addresses') {
      query = supabase.from('qs_addresses').select('street, city, state, zip').eq('profile_id', scanData.id).eq('is_last_known', false);
      title = 'Additional Addresses';
    } else if (dataType === 'phones') {
      query = supabase.from('qs_phones').select('phone_number, type').eq('profile_id', scanData.id);
      title = 'Phone Numbers';
    } else if (dataType === 'relatives') {
      query = supabase.from('qs_relatives').select('relative_name').eq('profile_id', scanData.id);
      title = 'Relatives';
    } else if (dataType === 'aliases') {
      query = supabase.from('qs_aliases').select('alias').eq('profile_id', scanData.id);
      title = 'Aliases';
    } else if (dataType === 'companies') {
      query = supabase.from('qs_jobs').select('company').eq('profile_id', scanData.id).not('company', 'is', null);
      title = 'Companies';
    }

    if (query) {
      const { data, error } = await query;
      if (!error && data) {
        setModalData(data);
        setModalTitle(title);
        setIsModalOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData([]);
    setModalTitle('');
  };

  const toggleContainer = (container: string) => {
    setExpandedContainers(prev => ({
      ...prev,
      [container]: !prev[container]
    }));
  };

  const handleViewBrokerDetails = async (broker: any) => {
    setSelectedBroker(broker);
    setIsBrokerModalOpen(true);
    
    try {
      // Load detailed broker data
      const { data: brokerDetailsData } = await supabase
        .from('qs_brokers')
        .select('*')
        .eq('profile_id', scanId)
        .eq('broker_name', broker.name)
        .single();

      setBrokerDetails(brokerDetailsData);
    } catch (err) {
      console.error('Error loading broker details:', err);
    }
  };

  const handleViewExposureDetails = async (dataType: string) => {
    setSelectedDataType(dataType);
    setIsExposureModalOpen(true);
    
    try {
      let tableName = '';
      let data: any[] = [];

      switch (dataType) {
        case 'relatives':
          tableName = 'qs_relatives';
          break;
        case 'addresses':
          tableName = 'qs_addresses';
          break;
        case 'phones':
          tableName = 'qs_phones';
          break;
        case 'jobs':
          tableName = 'qs_jobs';
          break;
        case 'emails':
          tableName = 'qs_emails';
          break;
        case 'aliases':
          tableName = 'qs_aliases';
          break;
        default:
          return;
      }

      const { data: exposureData } = await supabase
        .from(tableName)
        .select('*')
        .eq('profile_id', scanId);

      setModalExposureData(exposureData || []);
    } catch (err) {
      console.error('Error loading exposure details:', err);
    }
  };

  const handleGoBack = () => {
    navigate('/quick-scan');
  };

  const handleViewFullResults = () => {
    if (scanId) {
      navigate(`/quick-scan/results/${scanId}`);
    }
  };

  if (loading) {
    return (
      <PreProfileLayout>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Loading Pre-Profile Data...
          </Typography>
        </Box>
      </PreProfileLayout>
    );
  }

  if (error) {
    return (
      <PreProfileLayout>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ color: 'error.main', mb: 2 }}>
            Error
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button variant="contained" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </PreProfileLayout>
    );
  }

  if (!scanData) {
    return (
      <PreProfileLayout>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            No Data Found
          </Typography>
          <Button variant="contained" onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </PreProfileLayout>
    );
  }

  return (
    <PreProfileLayout>
      <Box sx={{ pt: 0.625, pb: 4 }}> {/* 5px = 0.625 * 8px */}
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#2b292c', // Title color from brand guidelines
            mb: 0.375, // 3px = 0.375 * 8px
            textAlign: 'left',
            fontSize: { xs: '1.75rem', sm: '2rem' }
          }}
        >
          QuickScan Summary
        </Typography>

        {/* Subtitle with Full Name and Date/Time */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 0.625, // 5px = 0.625 * 8px
            textAlign: 'left',
            fontSize: '1rem'
          }}
        >
          {scanData?.full_name ? scanData.full_name.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ') : 'Unknown Name'} | {scanData?.created_at ? new Date(scanData.created_at).toLocaleString() : 'Unknown Date'}
        </Typography>

        {/* Scan Results Container */}
        <Box
          sx={{
            border: '2px solid #022136', // Top app bar color outline
            borderRadius: 2,
            pt: 0.625, // 5px top padding
            pb: 0.625, // 5px bottom padding
            px: 3, // Keep left/right padding at 3
            mb: 0.625, // 5px spacing
            backgroundColor: '#022136' // Top app bar color background
          }}
        >
          {/* Main scan results text */}
          <Typography
            variant="body1"
            sx={{
              color: 'white', // White text
              mb: 0.625, // 5px spacing between paragraphs
              fontSize: '0.88rem', // 20% smaller than 1.1rem
              lineHeight: 1.4
            }}
          >
            We scanned <span style={{ fontWeight: 'bold' }}>1 of 213</span> data brokers and found <span style={{ fontWeight: 'bold' }}>{scanData?.total_exposure_count || 0}</span> of your private data points.
          </Typography>

          {/* Bottom disclaimer text */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
              fontSize: '0.7rem', // 20% smaller than 0.875rem
              lineHeight: 1.3
            }}
          >
            Our QuickScan finds just ~5% of the data available. Run a Full Scan now to see all the data we can find.
          </Typography>
        </Box>


        {/* Data Broker Container */}
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            pt: 0.5, // 4px padding from top
            pl: 0.375, // 3px padding from left
            pr: 0.375, // 3px padding from right
            pb: 0.625, // 5px padding from bottom
            backgroundColor: 'white'
          }}
        >
          {/* Top row with logo, heading, and button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2
            }}
          >
            {/* Left side - Logo and heading */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.25 }}> {/* 2px = 0.25 * 8px */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#2b292c',
                  fontSize: '0.7425rem', // 50% larger than 0.495rem
                  mb: 0.25 // 2px = 0.25 * 8px
                }}
              >
                Data Broker:
              </Typography>
              <img
                src="/assets/brokerLogos/intelius.png"
                alt="Intelius Logo"
                style={{ height: '36px', width: 'auto' }} // 50% larger than 24px
              />
            </Box>

            {/* Right side - Delete button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#14abfe', // Light blue secondary color
                color: 'white', // White text
                textTransform: 'none',
                px: 2.7, // 50% larger than 1.8
                py: 0.9, // 50% larger than 0.6
                fontSize: '0.81rem', // 50% larger than 0.54rem
                fontWeight: 'bold',
                borderRadius: 3.375, // 50% larger than 2.25
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1.2,
                minWidth: 'auto',
                mt: 0.625, // 5px = 0.625 * 8px
                '&:hover': {
                  backgroundColor: '#0d8fd8', // Darker blue on hover
                }
              }}
            >
              <span>Delete This Listing</span>
              <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>FOR FREE</span>
            </Button>
          </Box>
        </Box>

        {/* Second Container */}
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            pt: 0.625, // 5px padding from top
            pl: 0.375, // 3px padding from left
            pr: 0.375, // 3px padding from right
            pb: 0.625, // 5px padding from bottom
            mb: 3,
            backgroundColor: 'white'
          }}
        >
          {/* Top row with Full Name and Not Me button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end', // Align to bottom
              mb: 0.5 // Tighter spacing
            }}
          >
            {/* Left side - Full Name */}
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: '#2b292c',
                fontSize: '0.99rem', // 10% larger than 0.9rem
                pl: 0.625 // 5px padding from left
              }}
            >
              {scanData?.full_name ? scanData.full_name.split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              ).join(' ') : 'Unknown Name'}
            </Typography>

            {/* Right side - Not Me button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ef4444', // Red background
                color: 'white',
                textTransform: 'none',
                px: 2,
                py: 0.5,
                fontSize: '0.88rem', // 10% larger than 0.8rem
                fontWeight: 'bold',
                borderRadius: 2,
                mt: 0.625, // 5px padding from top
                mr: 0.625, // 5px padding from right
                '&:hover': {
                  backgroundColor: '#dc2626', // Darker red on hover
                }
              }}
            >
              Not Me
            </Button>
          </Box>

          {/* Primary Cell Phone Number */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: '#2b292c',
              fontSize: '0.88rem', // 10% larger than 0.8rem
              mb: 0.5, // Tighter spacing
              pl: 0.625 // 5px padding from left
            }}
          >
            {phoneNumber || 'No Phone Number Found'}
          </Typography>

          {/* City, State Code */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: '#2b292c',
              fontSize: '0.88rem', // 10% larger than 0.8rem
              pl: 0.625, // 5px padding from left
              mb: 0.5 // Tighter spacing
            }}
          >
            {scanData?.city && scanData?.state_name ? `${scanData.city}, ${scanData.state_name}` : 'City, State'}
          </Typography>

          {/* Last Known Address Title */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#2b292c',
              fontSize: '0.79rem', // Smaller than other text
              pl: 0.625, // 5px padding from left
              mt: 1, // 8px spacing from text above
              mb: 0.25 // Tighter spacing
            }}
          >
            Last Known Address:
          </Typography>

          {/* Last Known Address Content */}
          <Typography
            variant="body2"
            sx={{
              color: '#2b292c',
              fontSize: '0.88rem',
              pl: 0.625, // 5px padding from left
              whiteSpace: 'pre-line' // Preserve line breaks
            }}
          >
            {lastKnownAddress || 'No address found'}
          </Typography>

          {/* Relatives Title */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#2b292c',
              fontSize: '0.79rem', // Smaller than other text
              pl: 0.625, // 5px padding from left
              mt: 1, // 8px spacing from text above
              mb: 0.25 // Tighter spacing
            }}
          >
            Relatives:
          </Typography>

          {/* Relatives Content */}
          <Typography
            variant="body2"
            sx={{
              color: '#2b292c',
              fontSize: '0.88rem',
              pl: 0.625, // 5px padding from left
              mb: 0.25
            }}
          >
            {relatives.split(', ').slice(0, 6).join(', ')}
            {relatives.split(', ').length > 6 && (
              <>
                {' '}
                <span
                  style={{
                    color: '#14abfe',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => handleShowMore('relatives')}
                >
                  {relatives.split(', ').length - 6} More...
                </span>
              </>
            )}
          </Typography>
          {!relatives && (
            <Typography
              variant="body2"
              sx={{
                color: '#2b292c',
                fontSize: '0.88rem',
                pl: 0.625
              }}
            >
              No relatives found
            </Typography>
          )}

          {/* Aliases Title */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#2b292c',
              fontSize: '0.79rem', // Smaller than other text
              pl: 0.625, // 5px padding from left
              mt: 1, // 8px spacing from text above
              mb: 0.25 // Tighter spacing
            }}
          >
            Aliases:
          </Typography>

          {/* Aliases Content */}
          <Typography
            variant="body2"
            sx={{
              color: '#2b292c',
              fontSize: '0.88rem',
              pl: 0.625, // 5px padding from left
              mb: 0.25
            }}
          >
            {aliases.split(', ').slice(0, 6).join(', ')}
            {aliases.split(', ').length > 6 && (
              <>
                {' '}
                <span
                  style={{
                    color: '#14abfe',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => handleShowMore('aliases')}
                >
                  {aliases.split(', ').length - 6} More...
                </span>
              </>
            )}
          </Typography>
          {!aliases && (
            <Typography
              variant="body2"
              sx={{
                color: '#2b292c',
                fontSize: '0.88rem',
                pl: 0.625
              }}
            >
              No aliases found
            </Typography>
          )}

          {/* Companies Title */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#2b292c',
              fontSize: '0.79rem', // Smaller than other text
              pl: 0.625, // 5px padding from left
              mt: 1, // 8px spacing from text above
              mb: 0.25 // Tighter spacing
            }}
          >
            Companies:
          </Typography>

          {/* Companies Content */}
          {companies.split(', ').slice(0, 4).map((company, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: '#2b292c',
                fontSize: '0.88rem',
                pl: 0.625, // 5px padding from left
                mb: 0.25
              }}
            >
              {company}
            </Typography>
          ))}
          {companies.split(', ').length > 4 && (
            <Typography
              variant="body2"
              sx={{
                color: '#14abfe',
                fontSize: '0.88rem',
                pl: 0.625,
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#0d8fd8'
                }
              }}
              onClick={() => handleShowMore('companies')}
            >
              {companies.split(', ').length - 4} More...
            </Typography>
          )}
          {!companies && (
            <Typography
              variant="body2"
              sx={{
                color: '#2b292c',
                fontSize: '0.88rem',
                pl: 0.625
              }}
            >
              No companies found
            </Typography>
          )}

          {/* Emails Section - Full Width */}
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#2b292c',
                fontSize: '0.79rem',
                pl: 0.625,
                mb: 0.25
              }}
            >
              Emails:
            </Typography>
            {emails.slice(0, 2).map((email, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: '#2b292c',
                  fontSize: '0.88rem',
                  pl: 0.625,
                  mb: 0.25
                }}
              >
                {email.email_address}
              </Typography>
            ))}
            {emails.length > 2 && (
              <Typography
                variant="body2"
                sx={{
                  color: '#14abfe',
                  fontSize: '0.88rem',
                  pl: 0.625,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#0d8fd8'
                  }
                }}
                onClick={() => handleShowMore('emails')}
              >
                {emails.length - 2} More...
              </Typography>
            )}
          </Box>

          {/* Two Column Layout - Additional Addresses and Additional Numbers */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mt: 1 // 8px spacing from emails above
            }}
          >
            {/* Left Column - Additional Addresses */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#2b292c',
                  fontSize: '0.79rem',
                  pl: 0.625,
                  mb: 0.25
                }}
              >
                Additional Addresses:
              </Typography>
              {additionalAddresses.slice(0, 2).map((address, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: '#2b292c',
                    fontSize: '0.88rem',
                    pl: 0.625,
                    mb: 0.25,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {address.street}
                  {address.city && address.state && address.zip && `\n${address.city}, ${address.state} ${address.zip}`}
                  {index === 0 && additionalAddresses.length > 1 && <br />}
                </Typography>
              ))}
            </Box>

            {/* Right Column - Additional Numbers */}
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  color: '#2b292c',
                  fontSize: '0.79rem',
                  pl: 0.625,
                  mb: 0.25
                }}
              >
                Additional Numbers:
              </Typography>
              {additionalPhones.slice(0, 5).map((phone, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: '#2b292c',
                    fontSize: '0.88rem',
                    pl: 0.625,
                    mb: 0.25
                  }}
                >
                  {phone.phone_number}
                </Typography>
              ))}
              {additionalPhones.length > 5 && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#14abfe',
                    fontSize: '0.88rem',
                    pl: 0.625,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: '#0d8fd8'
                    }
                  }}
                  onClick={() => handleShowMore('phones')}
                >
                  {additionalPhones.length - 5} More...
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Three Action Containers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 2,
            mt: 1 // 8px spacing from data above
          }}
        >
          {/* Exposure Scan Container */}
          <Box
            sx={{
              backgroundColor: '#022136', // Primary dark blue background
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '120px',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              Exposure Scan
            </Typography>
          </Box>

          {/* Protect Your Family Container */}
          <Box
            sx={{
              backgroundColor: '#022136', // Primary dark blue background
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '120px',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              Protect Your Family
            </Typography>
          </Box>

          {/* Risk Profile Container */}
          <Box
            sx={{
              backgroundColor: '#022136', // Primary dark blue background
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '120px',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                lineHeight: 1.2
              }}
            >
              Risk<br />Profile
            </Typography>
          </Box>
        </Box>

        {/* Modal for showing more data */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2,
              backgroundColor: 'white'
            }
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#022136',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            {modalTitle}
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              ✕
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            {/* Data List */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 2,
              mb: 3
            }}>
              {modalData && modalData.map((item: any, index: number) => (
                <Typography 
                  key={index}
                  variant="caption"
                  sx={{ 
                    color: '#022136',
                    display: 'block',
                    py: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.email_address && item.email_address}
                  {item.phone_number && item.phone_number}
                  {item.street && item.street}
                  {item.relative_name && item.relative_name}
                  {item.alias && item.alias}
                  {item.company && item.company}
                </Typography>
              ))}
            </Box>

            {/* Remove Data Text */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#022136', textAlign: 'center' }}>
              Start removing this data.
            </Typography>

            {/* Remove Now Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#14abfe',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#0d8fd8'
                  }
                }}
              >
                <strong>Remove Now</strong>
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </PreProfileLayout>
  );
};

export default QuickScanPreProfile;
