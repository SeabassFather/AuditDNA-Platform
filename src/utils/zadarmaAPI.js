// ================================================================
// ZADARMA VoIP API INTEGRATION (DEMO MODE ENABLED)
// ================================================================
// Date: 2025-11-12 06:30:52 UTC
// Author: SeabassFather
// Purpose: VoIP calling, SMS, CRM logging
// Status: DEMO MODE (Add API keys to enable real calls)
// ================================================================

import axios from 'axios';

// CONFIGURATION
const ZADARMA_CONFIG = {
  apiKey: process.env.REACT_APP_ZADARMA_API_KEY || '',
  apiSecret: process.env.REACT_APP_ZADARMA_API_SECRET || '',
  baseURL: 'https://api.zadarma.com/v1',
  demoMode: !process.env.REACT_APP_ZADARMA_API_KEY
};

// CRM WEBHOOKS (Optional - for logging calls/SMS)
const CRM_WEBHOOKS = {
  salesforce: process.env.REACT_APP_SALESFORCE_WEBHOOK || '',
  hubspot: process.env.REACT_APP_HUBSPOT_WEBHOOK || '',
  pipedrive: process.env.REACT_APP_PIPEDRIVE_WEBHOOK || '',
  custom: process.env.REACT_APP_CUSTOM_CRM_WEBHOOK || ''
};

// CHECK IF IN DEMO MODE
export const isDemoMode = () => ZADARMA_CONFIG.demoMode;

// INITIATE CALL
export const initiateCall = async (fromNumber, toNumber, metadata = {}) => {
  if (ZADARMA_CONFIG.demoMode) {
    console.log('📞 DEMO MODE - Simulating call:', { fromNumber, toNumber, metadata });
    
    // Log to CRM in demo mode
    await logToCRM({
      type: 'call',
      from: fromNumber,
      to: toNumber,
      metadata,
      demo: true,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      demo: true,
      message: 'Call simulation successful (DEMO MODE)',
      data: { fromNumber, toNumber, metadata }
    };
  }

  try {
    // Real Zadarma API call
    const response = await axios.post(
      `${ZADARMA_CONFIG.baseURL}/request/callback/`,
      {
        from: fromNumber,
        to: toNumber,
        sip: metadata.sipNumber || 100
      },
      {
        auth: {
          username: ZADARMA_CONFIG.apiKey,
          password: ZADARMA_CONFIG.apiSecret
        }
      }
    );

    // Log to CRM
    await logToCRM({
      type: 'call',
      from: fromNumber,
      to: toNumber,
      metadata,
      demo: false,
      response: response.data,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      demo: false,
      message: 'Call initiated successfully',
      data: response.data
    };
  } catch (error) {
    console.error('❌ Zadarma API Error:', error);
    throw new Error(`Call failed: ${error.message}`);
  }
};

// SEND SMS
export const sendSMS = async (toNumber, message, metadata = {}) => {
  if (ZADARMA_CONFIG.demoMode) {
    console.log('📱 DEMO MODE - Simulating SMS:', { toNumber, message, metadata });
    
    // Log to CRM in demo mode
    await logToCRM({
      type: 'sms',
      to: toNumber,
      message,
      metadata,
      demo: true,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      demo: true,
      message: 'SMS simulation successful (DEMO MODE)',
      data: { toNumber, message, metadata }
    };
  }

  try {
    // Real Zadarma API SMS
    const response = await axios.post(
      `${ZADARMA_CONFIG.baseURL}/sms/send/`,
      {
        number: toNumber,
        message: message,
        caller_id: metadata.callerId || ''
      },
      {
        auth: {
          username: ZADARMA_CONFIG.apiKey,
          password: ZADARMA_CONFIG.apiSecret
        }
      }
    );

    // Log to CRM
    await logToCRM({
      type: 'sms',
      to: toNumber,
      message,
      metadata,
      demo: false,
      response: response.data,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      demo: false,
      message: 'SMS sent successfully',
      data: response.data
    };
  } catch (error) {
    console.error('❌ Zadarma SMS Error:', error);
    throw new Error(`SMS failed: ${error.message}`);
  }
};

// LOG TO CRM (Webhooks)
const logToCRM = async (activityData) => {
  const webhooks = Object.entries(CRM_WEBHOOKS).filter(([key, url]) => url);

  if (webhooks.length === 0) {
    console.log('ℹ️ No CRM webhooks configured');
    return;
  }

  const promises = webhooks.map(async ([crmName, webhookUrl]) => {
    try {
      await axios.post(webhookUrl, {
        source: 'CM Products International - AuditDNA',
        activity: activityData,
        crm: crmName,
        timestamp: new Date().toISOString()
      });
      console.log(`✅ Activity logged to ${crmName}`);
    } catch (error) {
      console.error(`❌ Failed to log to ${crmName}:`, error.message);
    }
  });

  await Promise.all(promises);
};

export default {
  initiateCall,
  sendSMS,
  isDemoMode
};