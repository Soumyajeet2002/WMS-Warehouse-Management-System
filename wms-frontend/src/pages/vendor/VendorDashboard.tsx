import React from 'react';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/* -------------------------------------------------------------------------- */
/* Demo data                                                                  */
/* -------------------------------------------------------------------------- */

const orderProgressData = [
  { day: 'Mon', current: 42, previous: 35 },
  { day: 'Tue', current: 68, previous: 52 },
  { day: 'Wed', current: 54, previous: 61 },
  { day: 'Thu', current: 92, previous: 74 },
  { day: 'Fri', current: 118, previous: 96 },
  { day: 'Sat', current: 105, previous: 88 },
  { day: 'Sun', current: 132, previous: 110 },
];

const inventoryData = [
  { name: 'Electronics', value: 2450 },
  { name: 'Accessories', value: 1280 },
  { name: 'Components', value: 760 },
  { name: 'Others', value: 330 },
];

const orderStatusData = [
  { name: 'Shipped', value: 42 },
  { name: 'Processing', value: 18 },
  { name: 'Pending', value: 12 },
  { name: 'Completed', value: 28 },
];

const shipmentData = [
  { day: 'Mon', shipments: 18 },
  { day: 'Tue', shipments: 24 },
  { day: 'Wed', shipments: 15 },
  { day: 'Thu', shipments: 31 },
  { day: 'Fri', shipments: 27 },
  { day: 'Sat', shipments: 12 },
];

const orderStatusColors = [
  '#FFFFFF',
  '#737373',
  '#A3A3A3',
  '#525252',
];

const inventoryColors = [
  '#FFFFFF',
  '#A3A3A3',
  '#737373',
  '#525252',
];

/* -------------------------------------------------------------------------- */
/* Shared panel styling                                                       */
/* -------------------------------------------------------------------------- */

const panelSx = {
  backgroundColor: '#111111',
  backgroundImage: 'none',
  border: '1px solid #262626',
  borderRadius: 1.5,
  height: '100%',
  boxShadow: 'none',
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const VendorDashboard = () => {
  const [currentDate] = React.useState(() =>
    new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  );

  const kpis = [
    {
      title: 'Orders Today',
      value: '128',
      change: '+12.5%',
      icon: <ShoppingCartOutlinedIcon />,
    },
    {
      title: 'Items Shipped',
      value: '420',
      change: '+8.2%',
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      title: 'Inventory Units',
      value: '4,820',
      change: '+4.6%',
      icon: <Inventory2OutlinedIcon />,
    },
    {
      title: 'Fulfillment Rate',
      value: '94%',
      change: '+3.1%',
      icon: <TrendingUpOutlinedIcon />,
    },
  ];

  const inventoryAlerts = [
    {
      sku: 'SKU-1024',
      name: 'Wireless Mouse',
      status: 'Low Stock',
      qty: 8,
    },
    {
      sku: 'SKU-2048',
      name: 'USB Keyboard',
      status: 'Low Stock',
      qty: 5,
    },
    {
      sku: 'SKU-3091',
      name: 'USB-C Cable',
      status: 'Out of Stock',
      qty: 0,
    },
    {
      sku: 'SKU-4102',
      name: 'Power Adapter',
      status: 'Low Stock',
      qty: 4,
    },
  ];

  const recentActivity = [
    {
      title: 'Order shipped',
      description: 'ORD-1024 was shipped',
      time: '12 min ago',
    },
    {
      title: 'Inventory received',
      description: '120 units received',
      time: '38 min ago',
    },
    {
      title: 'Order processed',
      description: 'ORD-1021 is processing',
      time: '1 hr ago',
    },
    {
      title: 'Shipment created',
      description: 'SHP-2048 created',
      time: '2 hrs ago',
    },
  ];

  const upcomingShipments = [
    {
      id: 'SHP-2048',
      destination: 'Delhi Warehouse',
      date: 'Today',
      status: 'Ready',
    },
    {
      id: 'SHP-2049',
      destination: 'Mumbai Warehouse',
      date: 'Tomorrow',
      status: 'Processing',
    },
    {
      id: 'SHP-2050',
      destination: 'Bhubaneswar',
      date: 'Sep 30',
      status: 'Pending',
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1800,
        mx: 'auto',
      }}
    >
      {/* ================================================================== */}
      {/* Header                                                             */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              letterSpacing: '-0.02em',
            }}
          >
            Vendor Operations Portal
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Real-time overview of your warehouse operations.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            color: 'text.secondary',
          }}
        >
          {/* Live indicator */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'success.main',
              }}
            />

            <Typography
              variant="caption"
              fontWeight={600}
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Live
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
          />

          <AccessTimeOutlinedIcon
            sx={{
              fontSize: 17,
            }}
          />

          <Typography variant="body2">
            {currentDate}
          </Typography>
        </Box>
      </Box>

      {/* ================================================================== */}
      {/* KPI Cards                                                          */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 1.5,
          mb: 1.5,
        }}
      >
        {kpis.map((kpi) => (
          <Card
            key={kpi.title}
            sx={panelSx}
          >
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    fontSize: '0.72rem',
                  }}
                >
                  {kpi.title}
                </Typography>

                <Box
                  sx={{
                    color: 'text.secondary',
                    display: 'flex',
                  }}
                >
                  {kpi.icon}
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: '1.75rem',
                    md: '2.15rem',
                  },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mt: 1.5,
                  letterSpacing: '-0.03em',
                }}
              >
                {kpi.value}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.75,
                  color: 'success.light',
                  fontWeight: 600,
                }}
              >
                ↑ {kpi.change} from last period
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ================================================================== */}
      {/* Main Dashboard Layout                                              */}
      {/* ================================================================== */}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(0, 2.25fr) minmax(300px, 0.85fr)',
          },
          gap: 1.5,
        }}
      >
        {/* ================================================================= */}
        {/* LEFT CONTENT                                                      */}
        {/* ================================================================= */}

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
          }}
        >
          {/* --------------------------------------------------------------- */}
          {/* Order Progress                                                  */}
          {/* --------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1.5,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Order Progress
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Current period vs previous period
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: '100%',
                  height: {
                    xs: 260,
                    md: 320,
                  },
                }}
              >
                <ResponsiveContainer>
                  <AreaChart data={orderProgressData}>
                    <defs>
                      <linearGradient
                        id="currentOrderGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFFFFF"
                          stopOpacity={0.16}
                        />

                        <stop
                          offset="100%"
                          stopColor="#FFFFFF"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="#262626"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111111',
                        border: '1px solid #262626',
                        borderRadius: 8,
                        color: '#FFFFFF',
                      }}
                    />

                    <Legend />

                    <Area
                      type="monotone"
                      dataKey="current"
                      name="Current Period"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      fill="url(#currentOrderGradient)"
                    />

                    <Line
                      type="monotone"
                      dataKey="previous"
                      name="Previous Period"
                      stroke="#737373"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* --------------------------------------------------------------- */}
          {/* Inventory + Alerts                                              */}
          {/* --------------------------------------------------------------- */}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'minmax(0, 1fr) minmax(0, 1fr)',
              },
              gap: 1.5,
            }}
          >
            {/* Inventory Overview */}
            <Card sx={panelSx}>
              <CardContent
                sx={{
                  p: 2,
                  '&:last-child': {
                    pb: 2,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                >
                  Inventory Overview
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Units by product category
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    height: 260,
                    mt: 1,
                  }}
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={inventoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={62}
                        outerRadius={92}
                        paddingAngle={3}
                      >
                        {inventoryData.map((_, index) => (
                          <Cell
                            key={`inventory-${index}`}
                            fill={
                              inventoryColors[
                                index %
                                  inventoryColors.length
                              ]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111111',
                          border: '1px solid #262626',
                          borderRadius: 8,
                        }}
                      />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Inventory Alerts */}
            <Card sx={panelSx}>
              <CardContent
                sx={{
                  p: 2,
                  '&:last-child': {
                    pb: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <WarningAmberOutlinedIcon
                    sx={{
                      fontSize: 19,
                      color: 'warning.main',
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={600}
                  >
                    Inventory Alerts
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1.5,
                  }}
                >
                  Products requiring attention
                </Typography>

                {inventoryAlerts.map((item, index) => (
                  <Box key={item.sku}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1.1,
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          noWrap
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.sku}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.75,
                        }}
                      >
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            fontSize: '0.65rem',
                            height: 24,
                            backgroundColor:
                              item.qty === 0
                                ? 'rgba(211, 47, 47, 0.12)'
                                : 'rgba(237, 108, 2, 0.12)',
                            color:
                              item.qty === 0
                                ? 'error.light'
                                : 'warning.light',
                          }}
                        />

                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{
                            minWidth: 20,
                            textAlign: 'right',
                          }}
                        >
                          {item.qty}
                        </Typography>
                      </Box>
                    </Box>

                    {index < inventoryAlerts.length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* --------------------------------------------------------------- */}
          {/* Shipment Activity                                               */}
          {/* --------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Shipment Activity
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Shipments processed this week
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 250,
                  mt: 1,
                }}
              >
                <ResponsiveContainer>
                  <BarChart data={shipmentData}>
                    <CartesianGrid
                      stroke="#262626"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111111',
                        border: '1px solid #262626',
                        borderRadius: 8,
                      }}
                    />

                    <Bar
                      dataKey="shipments"
                      name="Shipments"
                      fill="#FFFFFF"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* ================================================================= */}
        {/* RIGHT SIDEBAR                                                      */}
        {/* ================================================================= */}

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            alignContent: 'start',
          }}
        >
          {/* --------------------------------------------------------------- */}
          {/* Order Status                                                    */}
          {/* --------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Order Status
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Current order distribution
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  height: 240,
                  mt: 0.5,
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={88}
                      paddingAngle={3}
                    >
                      {orderStatusData.map((_, index) => (
                        <Cell
                          key={`status-${index}`}
                          fill={
                            orderStatusColors[
                              index %
                                orderStatusColors.length
                            ]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111111',
                        border: '1px solid #262626',
                        borderRadius: 8,
                      }}
                    />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* --------------------------------------------------------------- */}
          {/* Recent Activity                                                  */}
          {/* --------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Recent Activity
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                }}
              >
                Latest account activity
              </Typography>

              {recentActivity.map((activity, index) => (
                <Box
                  key={`${activity.title}-${index}`}
                  sx={{
                    display: 'flex',
                    gap: 1.25,
                    py: 1.25,
                    borderBottom:
                      index < recentActivity.length - 1
                        ? '1px solid #262626'
                        : 'none',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 8,
                      minWidth: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      mt: 0.65,
                    }}
                  />

                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                    >
                      {activity.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                      }}
                    >
                      {activity.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* --------------------------------------------------------------- */}
          {/* Upcoming Shipments                                               */}
          {/* --------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
              >
                Upcoming Shipments
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                }}
              >
                Next scheduled shipments
              </Typography>

              {upcomingShipments.map(
                (shipment, index) => (
                  <Box key={shipment.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        py: 1.25,
                      }}
                    >
                      <LocalShippingOutlinedIcon
                        sx={{
                          color: 'text.secondary',
                          fontSize: 21,
                        }}
                      />

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={600}
                        >
                          {shipment.id}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {shipment.destination}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          textAlign: 'right',
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={600}
                        >
                          {shipment.date}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: 'block',
                          }}
                        >
                          {shipment.status}
                        </Typography>
                      </Box>
                    </Box>

                    {index <
                      upcomingShipments.length - 1 && (
                      <Divider />
                    )}
                  </Box>
                ),
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
