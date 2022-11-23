import { useEffect, useState } from "react";
import axios from "axios";

export default function useStations() {
  const [stations, setStations] = useState([]);
  const [codigosWMO, setCodigosWMO] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    listStations();
  }, []);

  async function listStations() {
    setLoading(true);
    const response = await axios.get(`${baseURL}/estacao`);
    const stations = response.data;
    setStations(stations);
    const codigoWMO = stations.map((station) => station.codigo_wmo);
    setCodigosWMO(codigoWMO);
    setLoading(false);
  }

  async function createStation(station) {
    setLoading(true);
    await axios.post(`${baseURL}/estacao`, station);
    await listStations();
    setLoading(false);
  }

  async function editStation(station) {
    setLoading(true);
    await axios.put(`${baseURL}/estacao/${station.codigo_wmo}`, station);
    await listStations();
    setLoading(false);
  }

  async function getStationByCode(codigo_wmo) {
    setLoading(true);
    const response = await axios.get(`${baseURL}/estacao/${codigo_wmo}`);
    setStations([response.data]);
    setLoading(false);
  }

  async function deleteStationByCode(codigo_wmo) {
    setLoading(true);
    await axios.delete(`${baseURL}/estacao/${codigo_wmo}`);
    await listStations();   
    setLoading(false);
  }

  return {
    stations,
    codigosWMO,
    loading,
    listStations,
    createStation,
    editStation,
    getStationByCode,
    deleteStationByCode,
  };
}
