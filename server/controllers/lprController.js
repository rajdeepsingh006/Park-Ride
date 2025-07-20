export const checkInByLPR = (req, res) => {
  const { plate } = req.body;
  if (!plate) return res.status(400).json({ msg: 'License plate required' });

  console.log(`🚗 Plate detected: ${plate}`);
  // TODO: Find reservation by plate, update check-in status
  return res.json({ msg: 'Vehicle checked in successfully' });
};

export const checkOutByRFID = (req, res) => {
  const { rfid } = req.body;
  if (!rfid) return res.status(400).json({ msg: 'RFID tag required' });

  console.log(`📡 RFID scanned: ${rfid}`);
  // TODO: Lookup reservation by RFID, mark as checked out
  return res.json({ msg: 'Vehicle checked out successfully' });
};
