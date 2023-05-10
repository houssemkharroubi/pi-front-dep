import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaG91c3NlbTExIiwiYSI6ImNsZ2d6ODB4bzA1NTkzcHBncjl4cGJzMWMifQ.8tAhZuP1-_PqMpGynLJP3g';
const HospitalsMap = ({ handleClose }) => {
  const [state, setState] = useState({
    lng: -122.4194,
    lat: 37.7749,
    zoom: 12
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    const { lng, lat, zoom } = state;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    // Clean up
    return () => map.remove();
  }, []);

  const { lng, lat, zoom } = state;

  const mapContainerStyle = {
    height: '400px',
    width: '100%'
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Hospitals Map</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="map-dialog">
              <div className="map-container" ref={mapContainer} style={mapContainerStyle} />
              <div className="coordinates">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsMap;
