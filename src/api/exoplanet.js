import { database } from "./firebase.js";
import { PAGE_SIZE } from "../constants/config.js";

import { ref, get, push, update, remove, query, limitToFirst, startAfter, orderByKey } from 'firebase/database'

export const getExoplanetsRequest = async (page) => {
  const exoplanetsRef = ref(database, 'exoplanets');
  let exoplanets = []

  // Calculate the offset and limit
  const offset = PAGE_SIZE * page;

  if (offset === 0) {
    exoplanets = await get(query(
      exoplanetsRef,
      orderByKey(),
      limitToFirst(PAGE_SIZE)
    ));
    exoplanets = exoplanets.val()
  }

  else {
    // Fetch the first set of Exoplanets
    const firstQuery = query(exoplanetsRef, orderByKey(), limitToFirst(offset));
    const firstBatchSanpshot = await get(firstQuery)
    const firstBatchKeys = Object.keys(firstBatchSanpshot.val())
    const lastKeyOfFirstBatch = firstBatchKeys[firstBatchKeys.length - 1]; // Get last key

    const secondBatchQuery = query(
      exoplanetsRef,
      orderByKey(),
      startAfter(lastKeyOfFirstBatch),
      limitToFirst(PAGE_SIZE)
    );

    const secondBatchSnapshot = await get(secondBatchQuery);
    exoplanets = secondBatchSnapshot.val()
  }

  // Send the data
  return {
    exoplanets: Object.keys(exoplanets)
      .map(key => ({
        ...exoplanets[key],
        _id: key
      })),
    count: await getExoplanetsCount()
  };
};
export const getExoplanetRequest = async (id) => {
  const exoplanetRef = ref(database, "exoplanets/" + id);
  const exoplanet = await get(exoplanetRef);

  if (!exoplanet.exists()) 
    throw new Error("No such Exoplanet found");
  return exoplanet.val();
}
export const createExoplanetRequest = async (Exoplanet) => {
  const { name, discoverYear, distance, description, url } = Exoplanet;
  const savedExoplanet = await push(ref(database, 'exoplanets'), {
    name,
    discoverYear,
    distance,
    description,
    url
  });

  return {id: savedExoplanet.key}; // Return the document ID or a success message
}
export const updateExoplanetRequest = async (id, Exoplanet) => {
  const exoplanetRef = ref(database, 'exoplanets/' + id);
  const exoplanet = await update(exoplanetRef, Exoplanet);

  if (!exoplanet.exists()) 
    throw new Error("No such Exoplanet found");

  return exoplanet.val();
}
export const deleteExoplanetRequest = async (id) => {
  const exoplanetRef = ref(database, 'exoplanets/' + id);
  await remove(exoplanetRef);
}

// Get Exoplanet Count
export const getExoplanetsCount = async () => {
  const exoplanetsRef = ref(database, 'exoplanets');
  const exoplanets = await get(exoplanetsRef);
  return Object.keys(exoplanets.val()).length
};