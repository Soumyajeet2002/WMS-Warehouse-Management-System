// import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";

// const VendorDashboard = () => {
//   const { user } = useAuth();

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ fontWeight: 700 }}>
//         Vendor Dashboard
//       </Typography>

//       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//         Manage your products, inventory and orders.
//       </Typography>

//       <Grid container spacing={2.5} sx={{ mt: 1 }}>
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card>
//             <CardContent>
//               <Typography color="text.secondary">My Products</Typography>

//               <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
//                 128
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card>
//             <CardContent>
//               <Typography color="text.secondary">Pending Orders</Typography>

//               <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
//                 18
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card>
//             <CardContent>
//               <Typography color="text.secondary">Inventory Units</Typography>

//               <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
//                 4,820
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Card sx={{ mt: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Welcome, {user?.email}</Typography>

//           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//             You are logged in as a vendor.
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default VendorDashboard;

import React from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ActiveZonesEquipment from "../../components/dashboard/ActiveZonesEquipment";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* -------------------------------------------------------------------------- */
/* Demo data - will be replaced with backend data later                       */
/* -------------------------------------------------------------------------- */

const orderProgressData = [
  { day: "Mon", current: 42, previous: 35 },
  { day: "Tue", current: 68, previous: 52 },
  { day: "Wed", current: 54, previous: 61 },
  { day: "Thu", current: 92, previous: 74 },
  { day: "Fri", current: 118, previous: 96 },
  { day: "Sat", current: 105, previous: 88 },
  { day: "Sun", current: 132, previous: 110 },
];

const inventoryData = [
  { name: "Electronics", value: 2450 },
  { name: "Accessories", value: 1280 },
  { name: "Components", value: 760 },
  { name: "Others", value: 330 },
];

const orderStatusData = [
  { name: "Shipped", value: 42 },
  { name: "Processing", value: 18 },
  { name: "Pending", value: 12 },
  { name: "Completed", value: 28 },
];

const shipmentData = [
  { day: "Mon", shipments: 18 },
  { day: "Tue", shipments: 24 },
  { day: "Wed", shipments: 15 },
  { day: "Thu", shipments: 31 },
  { day: "Fri", shipments: 27 },
  { day: "Sat", shipments: 12 },
];

const orderStatusColors = ["#FFFFFF", "#737373", "#A3A3A3", "#525252"];

const inventoryColors = ["#FFFFFF", "#A3A3A3", "#737373", "#525252"];

/* -------------------------------------------------------------------------- */
/* Reusable card styles                                                       */
/* -------------------------------------------------------------------------- */

const panelSx = {
  backgroundColor: "#111111",
  backgroundImage: "none",
  border: "1px solid #262626",
  borderRadius: 2,
  height: "100%",
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const VendorDashboard = () => {
  const [currentDate] = React.useState(() =>
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  );

  const kpis = [
    {
      title: "Orders Today",
      value: "128",
      change: "+12.5%",
      icon: <ShoppingCartOutlinedIcon />,
    },
    {
      title: "Items Shipped",
      value: "420",
      change: "+8.2%",
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      title: "Inventory Units",
      value: "4,820",
      change: "+4.6%",
      icon: <Inventory2OutlinedIcon />,
    },
    {
      title: "Fulfillment Rate",
      value: "94%",
      change: "+3.1%",
      icon: <TrendingUpOutlinedIcon />,
    },
  ];

  return (
    <Box>
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ letterSpacing: "-0.02em" }}
          >
            Vendor Operations
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Overview of your orders, inventory and shipments.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />

          <Typography variant="body2">{currentDate}</Typography>
        </Box>
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* KPI Cards                                                          */}
      {/* ------------------------------------------------------------------ */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2,
        }}
      >
        {kpis.map((kpi) => (
          <Card key={kpi.title} sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {kpi.title}
                </Typography>

                <Box
                  sx={{
                    color: "text.secondary",
                    display: "flex",
                  }}
                >
                  {kpi.icon}
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mt: 2,
                  letterSpacing: "-0.03em",
                }}
              >
                {kpi.value}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 1,
                  color: "success.light",
                  fontWeight: 600,
                }}
              >
                ↑ {kpi.change} from last period
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* Main Dashboard Grid                                                */}
      {/* ------------------------------------------------------------------ */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 2fr) minmax(280px, 1fr)",
          },
          gap: 2,
        }}
      >
        {/* ================================================================ */}
        {/* LEFT CONTENT                                                     */}
        {/* ================================================================ */}

        <Box
          sx={{
            display: "grid",
            gap: 2,
          }}
        >
          {/* -------------------------------------------------------------- */}
          {/* Order Progress                                                  */}
          {/* -------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Order Progress
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Current period vs previous period
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "100%", height: 300 }}>
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

                    <CartesianGrid stroke="#262626" vertical={false} />

                    <XAxis
                      dataKey="day"
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis stroke="#737373" tickLine={false} axisLine={false} />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #262626",
                        borderRadius: 8,
                        color: "#FFFFFF",
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

          {/* Active Warehouse */}
          {/* <ActiveZonesEquipment /> */}

          {/* -------------------------------------------------------------- */}
          {/* Inventory + Alerts                                               */}
          {/* -------------------------------------------------------------- */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1fr) minmax(0, 1fr)",
              },
              gap: 2,
            }}
          >
            {/* Inventory */}
            <Card sx={panelSx}>
              <CardContent
                sx={{
                  p: 2.5,
                  "&:last-child": {
                    pb: 2.5,
                  },
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Inventory Overview
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Units by product category
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    height: 260,
                    mt: 2,
                  }}
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={inventoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                      >
                        {inventoryData.map((_, index) => (
                          <Cell
                            key={`inventory-${index}`}
                            fill={
                              inventoryColors[index % inventoryColors.length]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111111",
                          border: "1px solid #262626",
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
                  p: 2.5,
                  "&:last-child": {
                    pb: 2.5,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <WarningAmberOutlinedIcon
                    sx={{
                      fontSize: 20,
                      color: "warning.main",
                    }}
                  />

                  <Typography variant="h6" fontWeight={600}>
                    Inventory Alerts
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Products requiring attention
                </Typography>

                {[
                  {
                    sku: "SKU-1024",
                    name: "Wireless Mouse",
                    status: "Low Stock",
                    qty: 8,
                  },
                  {
                    sku: "SKU-2048",
                    name: "USB Keyboard",
                    status: "Low Stock",
                    qty: 5,
                  },
                  {
                    sku: "SKU-3091",
                    name: "USB-C Cable",
                    status: "Out of Stock",
                    qty: 0,
                  },
                  {
                    sku: "SKU-4102",
                    name: "Power Adapter",
                    status: "Low Stock",
                    qty: 4,
                  },
                ].map((item) => (
                  <Box key={item.sku}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1.25,
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {item.name}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {item.sku}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            backgroundColor:
                              item.qty === 0
                                ? "rgba(211, 47, 47, 0.12)"
                                : "rgba(237, 108, 2, 0.12)",
                            color:
                              item.qty === 0 ? "error.light" : "warning.light",
                          }}
                        />

                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{ minWidth: 24 }}
                        >
                          {item.qty}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* -------------------------------------------------------------- */}
          {/* Shipment Chart                                                   */}
          {/* -------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Shipment Activity
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Shipments processed this week
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: 260,
                  mt: 2,
                }}
              >
                <ResponsiveContainer>
                  <BarChart data={shipmentData}>
                    <CartesianGrid stroke="#262626" vertical={false} />

                    <XAxis
                      dataKey="day"
                      stroke="#737373"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis stroke="#737373" tickLine={false} axisLine={false} />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #262626",
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

        {/* ================================================================ */}
        {/* RIGHT SIDEBAR                                                     */}
        {/* ================================================================ */}

        <Box
          sx={{
            display: "grid",
            gap: 2,
            alignContent: "start",
          }}
        >
          {/* -------------------------------------------------------------- */}
          {/* Order Status                                                    */}
          {/* -------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Order Status
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Current order distribution
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: 250,
                  mt: 1,
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {orderStatusData.map((_, index) => (
                        <Cell
                          key={`status-${index}`}
                          fill={
                            orderStatusColors[index % orderStatusColors.length]
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111111",
                        border: "1px solid #262626",
                        borderRadius: 8,
                      }}
                    />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* -------------------------------------------------------------- */}
          {/* Recent Activity                                                  */}
          {/* -------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Recent Activity
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Latest account activity
              </Typography>

              {[
                {
                  title: "Order shipped",
                  description: "ORD-1024 was shipped",
                  time: "12 min ago",
                },
                {
                  title: "Inventory received",
                  description: "120 units received",
                  time: "38 min ago",
                },
                {
                  title: "Order processed",
                  description: "ORD-1021 is processing",
                  time: "1 hr ago",
                },
                {
                  title: "Shipment created",
                  description: "SHP-2048 created",
                  time: "2 hrs ago",
                },
              ].map((activity, index) => (
                <Box
                  key={`${activity.title}-${index}`}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: index < 3 ? "1px solid #262626" : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      mt: 0.8,
                      flexShrink: 0,
                    }}
                  />

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      {activity.description}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* -------------------------------------------------------------- */}
          {/* Upcoming Shipments                                               */}
          {/* -------------------------------------------------------------- */}

          <Card sx={panelSx}>
            <CardContent
              sx={{
                p: 2.5,
                "&:last-child": {
                  pb: 2.5,
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Upcoming Shipments
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Next scheduled shipments
              </Typography>

              {[
                {
                  id: "SHP-2048",
                  destination: "Delhi Warehouse",
                  date: "Today",
                  status: "Ready",
                },
                {
                  id: "SHP-2049",
                  destination: "Mumbai Warehouse",
                  date: "Tomorrow",
                  status: "Processing",
                },
                {
                  id: "SHP-2050",
                  destination: "Bhubaneswar",
                  date: "Sep 30",
                  status: "Pending",
                },
              ].map((shipment, index) => (
                <Box key={shipment.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 1.5,
                    }}
                  >
                    <LocalShippingOutlinedIcon
                      sx={{
                        color: "text.secondary",
                        fontSize: 22,
                      }}
                    />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600}>
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

                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" fontWeight={600}>
                        {shipment.date}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        {shipment.status}
                      </Typography>
                    </Box>
                  </Box>

                  {index < 2 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorDashboard;
