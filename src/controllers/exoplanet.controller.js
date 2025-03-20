import { database } from "../db.js";
import { PAGE_SIZE } from "../constants.js";
import { ref, get, push, update, remove, query, limitToFirst, startAfter, orderByKey } from 'firebase/database'

// Get Exoplanets with Pagination
export const getExoplanets = async (req, res) => {
  try {
    const { page } = req.params;
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
    res.json({
      exoplanets: Object.keys(exoplanets)
        .map(key => ({
          ...exoplanets[key],
          _id: key
        })),
      count: await getExoplanetsCount()
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Exoplanet Count
export const getExoplanetsCount = async () => {
  const exoplanetsRef = ref(database, 'exoplanets');
  const exoplanets = await get(exoplanetsRef);
  return Object.keys(exoplanets.val()).length
};

// Create Exoplanet
export const createExoplanet = async (req, res) => {
  try {
    const { name, discoverYear, distance, description, url } = req.body;
    const savedExoplanet = await push(ref(database, 'exoplanets'), {
      name,
      discoverYear,
      distance,
      description,
      url
    });

    res.status(201).json({id: savedExoplanet.key}); // Return the document ID or a success message
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Exoplanet by ID
export const getExoplanet = async (req, res) => {
  try {
    const exoplanetRef = ref(database, "exoplanets/" + req.params.id);
    const exoplanet = await get(exoplanetRef);

    if (!exoplanet.exists()) return res.status(400).json({ message: "No such Exoplanet found" });
    res.json(exoplanet.val());
  } catch (error) {
    return res.status(404).json({ message: "Exoplanet not found" });
  }
};

// Update Exoplanet
export const updateExoplanet = async (req, res) => {
  try {
    const exoplanetRef = ref(database, 'exoplanets/' + req.params.id);
    const exoplanet = await update(exoplanetRef, req.body);

    if (!exoplanet.exists()) return res.status(400).json({ message: "No such Exoplanet found" });

    res.json(exoplanet.val());
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Exoplanet
export const deleteExoplanet = async (req, res) => {
  try {
    const exoplanetRef = ref(database, 'exoplanets/' + req.params.id);
    await remove(exoplanetRef);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};