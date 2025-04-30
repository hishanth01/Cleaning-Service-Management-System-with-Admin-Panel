const express = require("express");
const { users, BookingModel } = require("../models/user.model");
const usersRouter = express.Router();

// add new user for system
usersRouter.post("/signup", async (req, res) => {
  try {
    const adduser = new users({
      username: req.body.username,
      password: req.body.password,
    });
    await users.create(adduser);
    res.status(200).json(adduser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error creating user");
  }
});
// add new user for system
usersRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          userName: user.username,
          Password: user.password,
          userId: user.id,
        });
      } else {
        res.status(401).json("Invalid username or password");
      }
    } else {
      res.status(401).json("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error during signin");
  }
});

usersRouter.post("/bookings", async (req, res) => {
  try {
    console.log("Booking request body:", req.body);
    const BookinData = req.body;
    const customerName = BookinData.customer_name;
    const address = BookinData.address;
    const datetime = BookinData.date_time;
    const service = BookinData.service_type;
    var userId = BookinData.userId;

    const addbooking = new BookingModel({
      customer_name: customerName,
      address: address,
      date_time: datetime,
      service_type: service,
      userId: userId,
    });
    console.log("Booking to save:", addbooking);
    await addbooking.save();
    res.status(200).json(addbooking);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error creating booking");
  }
});

usersRouter.get("/bookings", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching bookings");
  }
});

// Update booking by id
usersRouter.put("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true, runValidators: true }
    );
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json("Booking not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error updating booking");
  }
});

// Delete booking by id
usersRouter.delete("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
    if (deletedBooking) {
      res.status(200).json("Booking deleted successfully");
    } else {
      res.status(404).json("Booking not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error deleting booking");
  }
});

module.exports = usersRouter;
