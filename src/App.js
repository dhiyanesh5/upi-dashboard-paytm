import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ComprehensiveUPIDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // ==================== DATA FROM SURVEY (N=52) ====================
  
  // Market Share & Trust
  const marketShareData = [
    { name: 'Google Pay', value: 63.5, count: 33, color: '#4285F4' },
    { name: 'PhonePe', value: 15.4, count: 8, color: '#9C27B0' },
    { name: 'Paytm', value: 7.7, count: 4, color: '#00BAF2' },
    { name: 'Others', value: 13.4, count: 7, color: '#9E9E9E' }
  ];

  const trustRatings = [
    { app: 'Google Pay', rating: 4.09, color: '#4285F4' },
    { app: 'PhonePe', rating: 3.48, color: '#9C27B0' },
    { app: 'Paytm', rating: 3.26, color: '#00BAF2' }
  ];

  // Demographics
  const ageDistribution = [
    { age: '18-22', count: 18, percentage: 85.7 },
    { age: '23-27', count: 3, percentage: 14.3 }
  ];

  const occupationData = [
    { occupation: 'Student (UG)', count: 13, percentage: 61.9 },
    { occupation: 'Student (PG/PhD)', count: 5, percentage: 23.8 },
    { occupation: 'Working Professional', count: 3, percentage: 14.3 }
  ];

  const locationData = [
    { location: 'Tier 1 City', count: 10, percentage: 47.6 },
    { location: 'Tier 2 City', count: 6, percentage: 28.6 },
    { location: 'Rural Area', count: 3, percentage: 14.3 },
    { location: 'Tier 3 City/Town', count: 2, percentage: 9.5 }
  ];

  const transactionFrequency = [
    { frequency: '30+', count: 18, percentage: 72 },
    { frequency: '16-30', count: 4, percentage: 16 },
    { frequency: '6-15', count: 2, percentage: 8 },
    { frequency: '0-5', count: 1, percentage: 4 }
  ];

  const transactionValue = [
    { value: 'Under ₹100', count: 12, percentage: 48 },
    { value: '₹100-500', count: 7, percentage: 28 },
    { value: '₹500-2,000', count: 3, percentage: 12 },
    { value: '₹2,000+', count: 3, percentage: 12 }
  ];

  // Loyalty Drivers with Weighted Formula
  // Formula: 1.0 * 1st priority + 0.6 * 2nd priority + 0.2 * 3rd priority
  const loyaltyPriority1 = [
    { driver: 'Security & Trust', count: 18, percentage: 40.9 },
    { driver: 'Reliability', count: 11, percentage: 25.0 },
    { driver: 'Ease of Use', count: 11, percentage: 25.0 },
    { driver: 'Rewards & Cashback', count: 3, percentage: 6.8 },
    { driver: 'Friends/Family', count: 1, percentage: 2.3 }
  ];

  const loyaltyPriority2 = [
    { driver: 'Reliability', count: 16, percentage: 37.2 },
    { driver: 'Security & Trust', count: 10, percentage: 23.3 },
    { driver: 'Ease of Use', count: 9, percentage: 20.9 },
    { driver: 'Rewards & Cashback', count: 6, percentage: 14.0 },
    { driver: 'Friends/Family', count: 2, percentage: 4.7 }
  ];

  const loyaltyPriority3 = [
    { driver: 'Customer Support', count: 5, percentage: 26.3 },
    { driver: 'Friends/Family', count: 4, percentage: 21.1 },
    { driver: 'Security & Trust', count: 3, percentage: 15.8 },
    { driver: 'Ease of Use', count: 3, percentage: 15.8 },
    { driver: 'Rewards & Cashback', count: 3, percentage: 15.8 },
    { driver: 'Reliability', count: 1, percentage: 5.3 }
  ];

  // Calculate Weighted Loyalty Score
  const calculateWeightedScore = () => {
    const scores = {};
    
    // Initialize
    ['Security & Trust', 'Reliability', 'Ease of Use', 'Rewards & Cashback', 'Friends/Family', 'Customer Support'].forEach(driver => {
      scores[driver] = 0;
    });

    // Add weighted scores
    loyaltyPriority1.forEach(item => {
      scores[item.driver] += item.percentage * 1.0;
    });
    
    loyaltyPriority2.forEach(item => {
      scores[item.driver] = (scores[item.driver] || 0) + item.percentage * 0.6;
    });
    
    loyaltyPriority3.forEach(item => {
      scores[item.driver] = (scores[item.driver] || 0) + item.percentage * 0.2;
    });

    return Object.entries(scores)
      .map(([driver, score]) => ({ driver, score: parseFloat(score.toFixed(2)) }))
      .sort((a, b) => b.score - a.score);
  };

  const weightedLoyaltyScores = calculateWeightedScore();

  // AI Features
  const aiFeatures = [
    { feature: 'Scam Detection', rating: 4.50, priority: 'Must-Have' },
    { feature: 'AI Customer Support', rating: 4.00, priority: 'Must-Have' },
    { feature: 'Smart Reminders', rating: 3.94, priority: 'High' },
    { feature: 'Smart Bill Split', rating: 3.60, priority: 'High' },
    { feature: 'Voice UPI', rating: 3.34, priority: 'Medium' },
    { feature: 'AI Financial Coach', rating: 3.08, priority: 'Low' }
  ];

  const merchantFeatures = [
    { feature: 'Payment History Search', rating: 4.09 },
    { feature: 'Offline UPI', rating: 3.59 },
    { feature: 'Merchant Loyalty', rating: 3.27 },
    { feature: 'Merchant Ratings', rating: 3.00 },
    { feature: 'Instant Cashback Visibility', rating: 2.95 }
  ];

  const financialServices = [
    { service: 'Pay Later', rating: 3.00 },
    { service: 'UPI Credit Line', rating: 2.73 }
  ];

  // User Behavior
  const paytmUsage = [
    { status: 'Switched Away', percentage: 38.5, count: 20 },
    { status: 'Never Used', percentage: 23.1, count: 12 },
    { status: 'Tried & Quit', percentage: 19.2, count: 10 },
    { status: 'Active Users', percentage: 17.3, count: 9 }
  ];

  const fraudConcern = [
    { level: 'Very Concerned', percentage: 59.6, count: 31 },
    { level: 'Somewhat Concerned', percentage: 26.9, count: 14 },
    { level: 'Not Very Concerned', percentage: 9.6, count: 5 }
  ];

  const switchingWillingness = [
    { response: 'Would Switch', percentage: 56, count: 28, detail: 'Definitely + Probably yes' },
    { response: 'Maybe', percentage: 38, count: 19, detail: 'Undecided' },
    { response: 'Won\'t Switch', percentage: 6, count: 3, detail: 'Probably + Definitely no' }
  ];

  const interfacePreference = [
    { type: 'Simple Mode', percentage: 36, count: 18 },
    { type: 'Customizable', percentage: 36, count: 18 },
    { type: 'Advanced Mode', percentage: 28, count: 14 }
  ];

  const billSplitIssues = [
    { frequency: 'Frequently/Sometimes', percentage: 52.1, count: 11, detail: 'Face issues' },
    { frequency: 'Rarely', percentage: 30.4, count: 7, detail: 'Occasional' },
    { frequency: 'Never', percentage: 21.7, count: 5, detail: 'No issues' }
  ];

  const premiumWillingness = [
    { response: 'No', percentage: 69.2, count: 36 },
    { response: 'Maybe', percentage: 21.2, count: 11 },
    { response: 'Yes', percentage: 9.6, count: 5 }
  ];

  const rbiAwareness = [
    { status: 'Not Aware', percentage: 45.7, count: 21 },
    { status: 'Aware', percentage: 54.3, count: 25, detail: 'Very + Somewhat + Vaguely' }
  ];

  const rbiImpact = [
    { impact: 'No Impact', percentage: 53.8, count: 21 },
    { impact: 'Reduced Usage', percentage: 28.2, count: 11 },
    { impact: 'Stopped Using', percentage: 17.9, count: 7 }
  ];

  // Key Metrics
  const keyMetrics = {
    totalResponses: 52,
    paytmRejection: 80.8,
    fraudConcern: 86.5,
    wouldSwitch: 56,
    trustGap: 25.5
  };

  const COLORS = ['#4285F4', '#9C27B0', '#00BAF2', '#FF9800', '#4CAF50', '#F44336', '#9E9E9E'];

  // ==================== COMPONENTS ====================

  const MetricCard = ({ title, value, suffix = '', color = 'blue', subtitle = '' }) => (
    <div className={`metric-card bg-white rounded-lg shadow-lg p-4 sm:p-6 border-l-4 border-${color}-500 hover:shadow-xl transition-shadow`}>
      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{title}</div>
      <div className={`text-2xl sm:text-3xl font-bold text-${color}-600`}>
        {value}{suffix}
      </div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );

  const InsightBox = ({ type, title, items }) => {
    const styles = {
      crisis: 'bg-red-50 border-red-500 text-red-700',
      opportunity: 'bg-blue-50 border-blue-500 text-blue-700',
      solution: 'bg-green-50 border-green-500 text-green-700'
    };

    return (
      <div className={`${styles[type]} border-l-4 p-4 sm:p-6 rounded-lg shadow-lg`}>
        <h3 className="text-lg sm:text-xl font-bold mb-3">{title}</h3>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>
    );
  };

  const ChartContainer = ({ title, children, insight = null }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="w-full h-64 sm:h-80">
        {children}
      </div>
      {insight && (
        <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-sm sm:text-base">
          <p className="font-semibold text-yellow-800">💡 Key Insight:</p>
          <p className="text-gray-700 mt-1">{insight}</p>
        </div>
      )}
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm">
          <p className="font-semibold">{payload[0].name || payload[0].payload.name || payload[0].payload.driver}</p>
          <p className="text-blue-600">
            {typeof payload[0].value === 'number' ? 
              (payload[0].value % 1 === 0 ? payload[0].value : payload[0].value.toFixed(2)) 
              : payload[0].value}
            {payload[0].payload.percentage && '%'}
          </p>
        </div>
      );
    }
    return null;
  };

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-8 text-center bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            UPI Survey Insights Dashboard
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">
            Primary Research: IIT Guwahati Community (N=52)
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">
            January 31 - February 1, 2026
          </p>
          <span className="inline-block bg-blue-100 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-blue-800">
            Paytm Project AI - Build for India Initiative
          </span>
        </header>

        {/* Tabs - Mobile Scrollable */}
        <div className="mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max sm:justify-center pb-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'market', label: 'Market' },
              { id: 'loyalty', label: 'Loyalty' },
              { id: 'features', label: 'Features' },
              { id: 'demographics', label: 'Demographics' },
              { id: 'behavior', label: 'Behavior' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <MetricCard title="Total Responses" value={52} color="blue" />
              <MetricCard title="Paytm Rejection" value={80.8} suffix="%" color="red" subtitle="Rejected/Abandoned" />
              <MetricCard title="Fraud Concern" value={86.5} suffix="%" color="orange" subtitle="Very + Somewhat" />
              <MetricCard title="Would Switch" value={56} suffix="%" color="green" subtitle="For better value" />
              <MetricCard title="Trust Gap" value={25.5} suffix="%" color="purple" subtitle="GPay vs Paytm" />
            </div>

            {/* Strategic Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <InsightBox 
                type="crisis"
                title="🚨 THE CRISIS"
                items={[
                  '81% rejected/abandoned Paytm',
                  '25% trust deficit vs Google Pay',
                  '46% reduced usage post-RBI',
                  'Only 7.7% current market share'
                ]}
              />
              <InsightBox 
                type="opportunity"
                title="🎯 THE OPPORTUNITY"
                items={[
                  '87% fraud-concerned users',
                  '56% would switch for value',
                  'Security (41%) >> Cashback (7%)',
                  'Google Pay dominates at 63.5%'
                ]}
              />
              <InsightBox 
                type="solution"
                title="✅ THE SOLUTION"
                items={[
                  'AI Scam Shield (4.50/5)',
                  'Target Google Pay\'s 63.5%',
                  'Simple, fast, trustworthy',
                  'Smart Bill Split for virality'
                ]}
              />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-xs text-gray-600">Sample Profile</div>
                <div className="text-lg font-bold text-blue-600">86% aged 18-22</div>
                <div className="text-xs text-gray-500">Gen Z audience</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-xs text-gray-600">Transaction Frequency</div>
                <div className="text-lg font-bold text-purple-600">72% make 30+/month</div>
                <div className="text-xs text-gray-500">Heavy users</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-xs text-gray-600">Premium Rejection</div>
                <div className="text-lg font-bold text-red-600">69% say NO</div>
                <div className="text-xs text-gray-500">To ₹99/year fee</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-xs text-gray-600">Interface Want</div>
                <div className="text-lg font-bold text-green-600">72% want simple</div>
                <div className="text-xs text-gray-500">Or customizable</div>
              </div>
            </div>
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="Current UPI App Usage"
                insight="Google Pay dominates with 63.5%, NOT PhonePe as commonly assumed. Paytm at distant 7.7%."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="Trust Ratings (out of 5)"
                insight="Paytm has 25.5% trust deficit vs Google Pay (3.26 vs 4.09) - this is the core battle to win."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trustRatings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="app" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rating" fill="#00BAF2">
                      {trustRatings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <ChartContainer 
              title="Paytm Usage History"
              insight="80.8% have rejected Paytm - massive recapture opportunity if trust can be restored."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paytmUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="RBI Ban Awareness"
                insight="54.3% are aware of RBI restrictions - opportunity to control narrative for the 45.7% unaware."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={rbiAwareness}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.status}: ${entry.percentage}%`}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {rbiAwareness.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#9E9E9E' : '#FF9800'} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="RBI Impact (Among Aware Users)"
                insight="46.2% reduced or stopped usage due to RBI news. Urgent need for trust restoration campaign."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rbiImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="impact" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#FF5722" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* LOYALTY TAB */}
        {activeTab === 'loyalty' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">📊 Weighted Loyalty Analysis</h3>
              <p className="text-sm text-gray-700">
                Using formula: <span className="font-mono bg-white px-2 py-1 rounded">1.0 × Priority1 + 0.6 × Priority2 + 0.2 × Priority3</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                This gives higher weight to top priorities while considering all three rankings for a comprehensive view.
              </p>
            </div>

            <ChartContainer 
              title="Weighted Loyalty Score (Recommended GTM Priority)"
              insight="Security & Trust dominates with 51.86 weighted score - 7.6x more important than Cashback (6.82). Build trust FIRST, rewards LATER."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightedLoyaltyScores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="driver" type="category" width={150} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#4CAF50" label={{ position: 'right' }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ChartContainer 
                title="1st Priority (Weight: 1.0)"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loyaltyPriority1} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="driver" type="category" width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="2nd Priority (Weight: 0.6)"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loyaltyPriority2} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="driver" type="category" width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#FF9800" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="3rd Priority (Weight: 0.2)"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loyaltyPriority3} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="driver" type="category" width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#9C27B0" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">📋 GTM Priority Recommendations</h3>
              <div className="space-y-3">
                {weightedLoyaltyScores.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`text-2xl font-bold ${
                        idx === 0 ? 'text-green-600' : idx === 1 ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        #{idx + 1}
                      </span>
                      <span className="font-semibold">{item.driver}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{item.score}</div>
                      <div className="text-xs text-gray-500">Weighted Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEATURES TAB */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <ChartContainer 
              title="AI Feature Ratings (1-5 Scale)"
              insight="Scam Detection (4.50/5) is the clear winner - addresses 87% fraud concern. This should be the flagship launch feature."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiFeatures} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} />
                  <YAxis dataKey="feature" type="category" width={150} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rating" fill="#00BAF2">
                    {aiFeatures.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.rating >= 4 ? '#4CAF50' : entry.rating >= 3.5 ? '#FF9800' : '#F44336'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-green-700 mb-4">✅ Must-Have Features (4.0+)</h3>
                <div className="space-y-3">
                  {aiFeatures.filter(f => f.rating >= 4.0).map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">{feature.feature}</span>
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                        {feature.rating}/5
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Launch these in Phase 1 (Months 0-3) for maximum impact
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-orange-700 mb-4">⚠️ Lower Priority Features</h3>
                <div className="space-y-3">
                  {aiFeatures.filter(f => f.rating < 4.0).map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{feature.feature}</span>
                      <span className="px-3 py-1 bg-gray-400 text-white rounded-full text-sm font-bold">
                        {feature.rating}/5
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Consider for Phase 2+ after core features are stable
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer title="Merchant Features Ratings">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={merchantFeatures} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis dataKey="feature" type="category" width={150} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rating" fill="#9C27B0" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer title="Financial Services Interest">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialServices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="rating" fill="#FF5722" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* DEMOGRAPHICS TAB */}
        {activeTab === 'demographics' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">👥 Sample Characteristics</h3>
              <p className="text-sm text-gray-700 mt-2">
                Predominantly Gen Z (86% aged 18-22), students (86%), from Tier 1/2 cities (76%), making 30+ transactions/month (72%) - heavy digital payment users.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="Age Distribution"
                insight="86% are 18-22 years old - Gen Z audience. Strategy should be mobile-first, social-driven, and trust-focused."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.age}: ${entry.percentage}%`}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {ageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="Occupation Breakdown"
                insight="86% are students (UG + PG/PhD) - campus influencer strategy and student-focused features could drive viral adoption."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="occupation" angle={-15} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <ChartContainer 
              title="Geographic Distribution"
              insight="76% from Tier 1/2 cities - but 24% from Tier 3/Rural areas validates need for offline UPI and regional language support."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="Transaction Frequency (Per Month)"
                insight="72% make 30+ transactions monthly - these are power users. High engagement = high switching cost if done right."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionFrequency}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="frequency" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#9C27B0" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="Typical Transaction Value"
                insight="76% transactions under ₹500 - focus on speed and convenience for small, frequent payments rather than high-value security alone."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionValue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" angle={-15} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#FF9800" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        )}

        {/* BEHAVIOR TAB */}
        {activeTab === 'behavior' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="Fraud Concern Level"
                insight="86.5% concerned about fraud (60% VERY concerned) - this validates AI Scam Detection as the #1 feature priority."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fraudConcern}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.level}: ${entry.percentage}%`}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {fraudConcern.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#F44336' : index === 1 ? '#FF9800' : '#4CAF50'} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="Switching Willingness (for better value)"
                insight="56% would switch - huge opportunity! But 38% are 'maybe' - need strong differentiation to convert fence-sitters."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={switchingWillingness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="response" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#4CAF50" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer 
                title="Interface Preference"
                insight="72% want Simple or Customizable (NOT complex super-app). Launch with 'Paytm Lite' mode - clean, fast, focused on payments."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interfacePreference}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.type}: ${entry.percentage}%`}
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {interfacePreference.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <ChartContainer 
                title="Bill Splitting Issues"
                insight="52% face bill splitting issues frequently/sometimes - validates Smart Bill Split as viral growth driver."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={billSplitIssues}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="frequency" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="percentage" fill="#00BAF2" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <ChartContainer 
              title="Premium Subscription Willingness (₹99/year)"
              insight="69% say NO to premium fees - UPI MUST be free. Monetize via merchants, lending, ads - NOT consumer subscriptions."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={premiumWillingness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="response" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">🎯 Key Behavioral Insights for GTM</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 mb-2">What Works</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Free model (69% reject premium)</li>
                    <li>• Simple interface (72% want this)</li>
                    <li>• AI fraud protection (87% concerned)</li>
                    <li>• Social features (52% bill split pain)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-700 mb-2">What Doesn't</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Premium subscriptions (69% reject)</li>
                    <li>• Complex super-app (28% want this)</li>
                    <li>• Cashback-first strategy (only 7% priority)</li>
                    <li>• Ignoring trust issues (87% fraud concern)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-xs sm:text-sm text-gray-600 bg-white rounded-lg p-4 sm:p-6">
          <p className="mb-2">
            <strong>Methodology:</strong> Online survey of IIT Guwahati community (students, faculty)
          </p>
          <p className="mb-2">
            <strong>Sample Size:</strong> N=52 | <strong>Date:</strong> January 31 - February 1, 2026
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Created for Paytm Project AI - Build for India Initiative | Dashboard by Dhiyanesh
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ComprehensiveUPIDashboard;
