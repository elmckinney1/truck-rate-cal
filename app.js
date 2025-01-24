// Google Maps API to calculate distance and time
const calculateDistance = () => {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
    origins: [from],
    destinations: [to],
    travelMode: 'DRIVING',
    },
    (response, status) => {
    if (status === 'OK') {
    const distanceInMeters = response.rows[0].elements[0].distance.value;
    const timeInSeconds = response.rows[0].elements[0].duration.value;
    
    const distanceInMiles = (distanceInMeters / 1609.34).toFixed(2);
    const timeInMinutes = Math.ceil(timeInSeconds / 60);
    
    document.getElementById('distance').textContent = distanceInMiles;
    document.getElementById('time').textContent = `${timeInMinutes} minutes`;
    } else {
    alert('Error fetching distance: ' + status);
    }
    }
    );
    };
    
    // Perform calculations
    const calculateRates = () => {
    const distance = parseFloat(document.getElementById('distance').textContent);
    const ratePerMile = parseFloat(document.getElementById('ratePerMile').value);
    const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
    const fuelCost = parseFloat(document.getElementById('fuelCost').value);
    const driverPercentage = parseFloat(document.getElementById('driverPercentage').value);
    
    const roundTripMiles = distance * 2;
    const fuelCostTotal = ((roundTripMiles / fuelEfficiency) * fuelCost).toFixed(2);
    const truckingRate = (roundTripMiles * ratePerMile).toFixed(2);
    const driverPay = (truckingRate - (truckingRate * driverPercentage) / 100).toFixed(2);
    
    document.getElementById('roundTripMiles').textContent = roundTripMiles;
    document.getElementById('fuelCostResult').textContent = fuelCostTotal;
    document.getElementById('truckingRate').textContent = truckingRate;
    document.getElementById('driverPay').textContent = driverPay;
    };
    
    // Event Listeners
    document.getElementById('calculateDistance').addEventListener('click', calculateDistance);
    document.getElementById('calculate').addEventListener('click', calculateRates);
    