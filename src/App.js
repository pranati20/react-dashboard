import React, { useState, useEffect } from 'react';
import * as d3 from 'd3-fetch';
import { Container, Grid, Paper, Button,Typography, AppBar, Toolbar, Box, ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import TelecomRiskPieChart from './components/TelecomRiskPieChart';
import SourceDistributionChart from './components/SourceDistributionChart';
import PhoneNetworkPieChart from './components/PhoneNetworkPieChart';
import BillingTypeDonutChart from './components/BillingTypeDonutChart';
import TopSocialSitesColumnChart from './components/TopSocialSites';
import ReachablePieChart from './components/ReachablePieChart';
import IdentityConfidencePieChart from './components/IdentityConfidencePieChart';
import theme from './theme';

const App = () => {
  const [data, setData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [phoneNetworkData, setPhoneNetworkData] = useState([]);
  const [billingTypeData, setBillingTypeData] = useState([]);
  const [topSocialSitesData, setTopSocialSitesData] = useState([]);
  const totalUsers = 937; // Total number of users

  useEffect(() => {
    // Load and parse the CSV file
    d3.csv('/Modified_Social_Score.csv').then(data => {
      const formattedData = data.map((row, index) => ({
        id: index,
        name: row.name,
        socialFootprintScore: +row["Risk Model.socialFootprintScore"],
        telecomRisk: row["Risk Model.telecomRisk"],
        city: row.City,
        digitalFootprint: +row["Risk Model.digitalFootprint"],
        phoneSocialMediaCount: +row["Risk Model.phoneSocialMediaCount"],
        identityConfidence: row["Risk Model.identityConfidence"],
        source: row["Phone to Name.source"],
        currentNetworkName: row["Phone Network.currentNetworkName"],
        billingType: row["Phone Network.numberBillingType"],
        housing: row["Phone Social Premium.housing"],
        indiamart: row["Phone Social Premium.indiamart"],
        instagram: row["Phone Social Premium.instagram"],
        jeevansaathi: row["Phone Social Premium.jeevansaathi"],
        jiomart: row["Phone Social Premium.jiomart"],
        my11: row["Phone Social Premium.my11"]
      }));

      setData(formattedData);

      // Aggregate data for source distribution and filter top 5
      const sourceCount = formattedData.reduce((acc, row) => {
        const source = row.source || 'Unknown';
        if (acc[source]) {
          acc[source] += 1;
        } else {
          acc[source] = 1;
        }
        return acc;
      }, {});

      const sortedSourceData = Object.keys(sourceCount)
        .map(source => ({
          name: source,
          count: sourceCount[source],
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Keep only the top 5 sources

      setSourceData(sortedSourceData);

      // Aggregate data for phone network distribution
      const phoneNetworkCount = formattedData.reduce((acc, row) => {
        const network = row.currentNetworkName || 'Unknown';
        if (acc[network]) {
          acc[network] += 1;
        } else {
          acc[network] = 1;
        }
        return acc;
      }, {});

      const phoneNetworkData = Object.keys(phoneNetworkCount).map(network => ({
        name: network,
        value: phoneNetworkCount[network],
      }));
      setPhoneNetworkData(phoneNetworkData);

      // Aggregate data for billing type distribution
      const billingTypeCount = formattedData.reduce((acc, row) => {
        const type = row.billingType || 'Unknown';
        if (acc[type]) {
          acc[type] += 1;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {});

      const billingTypeData = Object.keys(billingTypeCount).map(type => ({
        name: type,
        value: billingTypeCount[type],
      }));
      setBillingTypeData(billingTypeData);
    });

    // Fetch the top social sites data
    fetch('/top_social_sites.json')
      .then(response => response.json())
      .then(data => {
        const chartData = Object.keys(data).map((key) => ({
          name: key.split('.').pop(), // Get the site name from the key
          count: data[key]
        }));
        setTopSocialSitesData(chartData);
      });

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} style={{ padding: 0, height: '100vh', overflow: 'hidden' }}>
      <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar style={{ backgroundColor: '#a4b89e', color: 'white', margin:'5px' }}>
      <Typography variant="h6" style={{ color: 'white', fontFamily: 'Arial', fontSize: '28px', fontWeight: 'bold' }}>
        React Dashboard
      </Typography>
      <Toolbar style={{ backgroundColor: '#a4b89e', color: 'white', margin:'1px' , borderRadius:'60px',boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.7)', left:'%', height:'2px'}}>
      <Typography variant="h6" style={{ color: 'white', fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold' }}>
        TOTAL USERS: {totalUsers}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      
    </Toolbar>
      <Box sx={{ flexGrow: 1 }} />
      <Button style={{ backgroundColor: 'blue', color: 'white', margin:'10px' }}>Sign Up</Button>
      <Button style={{ backgroundColor: 'blue', color: 'white' }}>Your Profile</Button>
    </Toolbar>
        </AppBar>
        <Grid container spacing={0} style={{ height: '100%' }}>
          <Grid item xs={3} style={{ height: '20%' }}>


          </Grid>
          <Grid item xs={4} style={{ height: '2%' }}></Grid>
          <Grid item xs={4} style={{ height: '20%' }}></Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.7} style={{ marginTop: '-130px', marginLeft:'30px' }}>
          <Paper style={{ padding: '13px', height: '60%', borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)'}}>
              <Typography variant="h7" gutterBottom>Telecom Risk Pie Chart</Typography>
              {data.length > 0 && <TelecomRiskPieChart data={data} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3} style={{ marginTop: '-140px', padding:'10px' }} >
          <Paper style={{ padding: '20px', height: '80%', borderRadius:'40px',boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)'  }}>
              <Typography variant="h7" gutterBottom>Source Distribution</Typography>
              {sourceData.length > 0 && <SourceDistributionChart data={sourceData} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ marginTop: '-140px', padding:'10px' }}>
          <Paper style={{ padding: '10px', height: '120%', borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)' }}>
              <Typography variant="h7" gutterBottom>Phone Network Distribution</Typography>
              {phoneNetworkData.length > 0 && <PhoneNetworkPieChart data={phoneNetworkData} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.9} style={{ marginTop: '-130px' }}>
          <Paper style={{ padding: '16px', height: '60%', borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)' }}>
              <Typography variant="h7" gutterBottom>Billing Type Distribution</Typography>
              {billingTypeData.length > 0 && <BillingTypeDonutChart data={billingTypeData} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={2.7} style={{ marginTop: '-175px',  marginLeft:'30px' }}>
          <Paper style={{ padding: '10px', height: '75%' , borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)'}}>
              <Typography variant="h7" gutterBottom>Top Social Sites</Typography>
              {topSocialSitesData.length > 0 && <TopSocialSitesColumnChart data={topSocialSitesData} />}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.85}  style={{ marginTop: '-90px',  marginLeft:'10px' }}>
          <Paper style={{ padding: '14px', height: '70%' , borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.2)'}}>
              <Typography variant="h7" gutterBottom>Reachable vs Non-Reachable</Typography>
              <ReachablePieChart />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.9} style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', marginTop: '-180px', marginLeft: '394px' }}>
          <Paper style={{ padding: '10px', height: '75%' , borderRadius:'40px' ,boxShadow: '0 4px 4px 0 rgba(255, 255, 255, 0.5)'}}>
              <Typography variant="h7" gutterBottom>Identity Confidence Distribution</Typography>
              <IdentityConfidencePieChart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
