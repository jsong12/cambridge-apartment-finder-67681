const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const RED_LINE_STATIONS = [
  { name: 'Harvard', lat: 42.3732, lon: -71.1189 },
  { name: 'Central', lat: 42.3655, lon: -71.1038 },
  { name: 'Kendall', lat: 42.3620, lon: -71.0860 },
  { name: 'Porter', lat: 42.3884, lon: -71.1191 }
];

exports.handler = async function () {
  const fakeListing = {
    title: "1BR on Mass Ave",
    price: "$2700",
    lat: 42.3730,
    lon: -71.1100,
    url: "https://example.com/listing/123"
  };

  const distanceToHarvard = 12;

  return {
    statusCode: 200,
    body: JSON.stringify([
      { ...fakeListing, distance: distanceToHarvard }
    ])
  };
};
