import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from '@mui/material';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const zones = [
  {
    name: 'Zone A',
    type: 'Picking',
    color: '#2196F3',
    lightColor: 'rgba(33, 150, 243, 0.18)',
  },
  {
    name: 'Zone B',
    type: 'Packing',
    color: '#4CAF50',
    lightColor: 'rgba(76, 175, 80, 0.18)',
  },
  {
    name: 'Zone C',
    type: 'Storage',
    color: '#FF9800',
    lightColor: 'rgba(255, 152, 0, 0.18)',
  },
  {
    name: 'Zone F',
    type: 'Dispatch',
    color: '#9C27B0',
    lightColor: 'rgba(156, 39, 176, 0.18)',
  },
];

const docks = [
  { name: 'Dock 01', status: 'Loading', color: '#4CAF50' },
  { name: 'Dock 02', status: 'Ready', color: '#2196F3' },
  { name: 'Dock 03', status: 'Loading', color: '#4CAF50' },
  { name: 'Dock 04', status: 'Idle', color: '#757575' },
];

const ActiveZonesEquipment = () => {
  return (
    <Card
      sx={{
        backgroundColor: '#111111',
        backgroundImage: 'none',
        border: '1px solid #262626',
        borderRadius: 2,
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          '&:last-child': {
            pb: 2.5,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            gap: 1,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={600}
            >
              Active Zones & Equipment
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Live warehouse activity overview
            </Typography>
          </Box>

          <Chip
            label="● Live"
            size="small"
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.12)',
              color: '#66BB6A',
              fontWeight: 600,
              border: '1px solid rgba(76, 175, 80, 0.25)',
            }}
          />
        </Box>

        {/* Warehouse Map */}
        <Box
          sx={{
            position: 'relative',
            minHeight: 430,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#171A20',
            border: '1px solid #30343D',
          }}
        >
          {/* Floor grid */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.18,
              backgroundImage: `
                linear-gradient(#FFFFFF 1px, transparent 1px),
                linear-gradient(90deg, #FFFFFF 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Receiving Area */}
          <Box
            sx={{
              position: 'absolute',
              left: '3%',
              top: '6%',
              width: '19%',
              height: '25%',
              border: '2px solid #26A69A',
              borderRadius: 1.5,
              backgroundColor: 'rgba(38, 166, 154, 0.12)',
              p: 1.5,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color: '#4DB6AC' }}
            >
              RECEIVING
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
              }}
            >
              <LocalShippingOutlinedIcon
                sx={{
                  fontSize: 42,
                  color: '#26A69A',
                }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              4 pallets waiting
            </Typography>
          </Box>

          {/* Zones */}
          <Box
            sx={{
              position: 'absolute',
              left: '25%',
              right: '3%',
              top: '6%',
              height: '34%',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1.5,
            }}
          >
            {zones.map((zone) => (
              <Box
                key={zone.name}
                sx={{
                  position: 'relative',
                  border: `2px solid ${zone.color}`,
                  borderRadius: 1.5,
                  backgroundColor: zone.lightColor,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 1.5,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box>
                  <Typography
                    fontWeight={700}
                    sx={{
                      color: zone.color,
                      fontSize: '0.95rem',
                    }}
                  >
                    {zone.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {zone.type}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Inventory2OutlinedIcon
                    sx={{
                      fontSize: 30,
                      color: zone.color,
                    }}
                  />

                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#66BB6A',
                      boxShadow:
                        '0 0 8px rgba(102, 187, 106, 0.8)',
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Rack Area */}
          <Box
            sx={{
              position: 'absolute',
              left: '4%',
              top: '38%',
              width: '38%',
              height: '34%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((rack) => (
              <Box
                key={rack}
                sx={{
                  border: '1px solid #546E7A',
                  borderRadius: 1,
                  backgroundColor: '#263238',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 0.7,
                  p: 1,
                }}
              >
                <Typography
                  variant="caption"
                  color="#90A4AE"
                  fontWeight={600}
                >
                  RACK-{String(rack).padStart(2, '0')}
                </Typography>

                {[1, 2, 3].map((shelf) => (
                  <Box
                    key={shelf}
                    sx={{
                      height: 7,
                      borderRadius: 0.5,
                      backgroundColor:
                        shelf === 3
                          ? '#455A64'
                          : '#607D8B',
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>

          {/* Forklift 1 */}
          <Box
            sx={{
              position: 'absolute',
              left: '47%',
              top: '48%',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              p: 0.8,
              borderRadius: 1,
              backgroundColor: 'rgba(255, 152, 0, 0.16)',
              border: '1px solid rgba(255, 152, 0, 0.4)',
            }}
          >
            <PrecisionManufacturingOutlinedIcon
              sx={{
                color: '#FFB300',
                fontSize: 30,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: '#FFB300',
                fontWeight: 700,
              }}
            >
              FL-01
            </Typography>
          </Box>

          {/* Worker 1 */}
          <Box
            sx={{
              position: 'absolute',
              left: '59%',
              top: '58%',
              width: 42,
              height: 42,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(33, 150, 243, 0.18)',
              border: '1px solid rgba(33, 150, 243, 0.5)',
            }}
          >
            <PersonOutlineOutlinedIcon
              sx={{
                color: '#42A5F5',
                fontSize: 27,
              }}
            />
          </Box>

          {/* Packing station */}
          <Box
            sx={{
              position: 'absolute',
              right: '4%',
              top: '47%',
              width: '30%',
              height: '25%',
              border: '2px solid #EC407A',
              borderRadius: 1.5,
              backgroundColor: 'rgba(236, 64, 122, 0.1)',
              p: 1.5,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ color: '#EC407A' }}
            >
              PACKING STATION
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '65%',
              }}
            >
              <Inventory2OutlinedIcon
                sx={{
                  fontSize: 36,
                  color: '#EC407A',
                }}
              />

              <PersonOutlineOutlinedIcon
                sx={{
                  fontSize: 36,
                  color: '#42A5F5',
                }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              3 operators active
            </Typography>
          </Box>

          {/* Forklift 2 */}
          <Box
            sx={{
              position: 'absolute',
              left: '44%',
              bottom: '19%',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              p: 0.8,
              borderRadius: 1,
              backgroundColor: 'rgba(255, 152, 0, 0.16)',
              border: '1px solid rgba(255, 152, 0, 0.4)',
            }}
          >
            <PrecisionManufacturingOutlinedIcon
              sx={{
                color: '#FFB300',
                fontSize: 28,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: '#FFB300',
                fontWeight: 700,
              }}
            >
              FL-02
            </Typography>
          </Box>

          {/* Worker 2 */}
          <Box
            sx={{
              position: 'absolute',
              left: '66%',
              bottom: '18%',
              width: 42,
              height: 42,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(33, 150, 243, 0.18)',
              border: '1px solid rgba(33, 150, 243, 0.5)',
            }}
          >
            <PersonOutlineOutlinedIcon
              sx={{
                color: '#42A5F5',
                fontSize: 27,
              }}
            />
          </Box>

          {/* Bottom docks */}
          <Box
            sx={{
              position: 'absolute',
              left: '3%',
              right: '3%',
              bottom: '3%',
              height: '14%',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
            }}
          >
            {docks.map((dock) => (
              <Box
                key={dock.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  borderRadius: 1,
                  backgroundColor: '#20242B',
                  border: '1px solid #343A45',
                }}
              >
                <LocalShippingIcon
                  sx={{
                    fontSize: 25,
                    color: dock.color,
                  }}
                />

                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    display="block"
                  >
                    {dock.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: dock.color,
                    }}
                  >
                    {dock.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 2,
            pt: 1.5,
            borderTop: '1px solid #262626',
          }}
        >
          {[
            ['#2196F3', 'Picking'],
            ['#4CAF50', 'Packing'],
            ['#FF9800', 'Storage'],
            ['#9C27B0', 'Dispatch'],
            ['#42A5F5', 'Operator'],
            ['#FFB300', 'Forklift'],
          ].map(([color, label]) => (
            <Box
              key={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.7,
              }}
            >
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: color,
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActiveZonesEquipment;
