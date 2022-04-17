
const Request = require("../models/requestModel");
const asyncHandler = require("express-async-handler");


// @desc    register request
// @route   POST request/add
// @access  Private

const addRequest = asyncHandler(async (req, res) => {
    const { user, title, lab, note, type } = req.body;
    let request = await Request.create({ user, title, lab, note, type });

    if (request) {
        res.json({
            message: "request has been added",
            success: true,
        })
    } else {
        throw new Error("Request not created")
    }
});


// @desc    register request
// @route   GET  request
// @access  Private

const dcoRequests = asyncHandler(async (req, res) => {
    let requests = await Request.find({}).populate('user');
    if (requests) {
        res.json({
            message: "Successfully fetch",
            data: requests
        })
    } else {
        throw new Error("Request not created")
    }
});



// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const approvedByDco = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { dcoApproved: true } })
        res.json({
            message: "Request has been approved",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Complaint not found");
    }
});


// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const rejectedByDco = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { dcoApproved: false } })
        res.json({
            message: "Request has been rejected",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});



// @desc    committee complaints
// @route   GET  request
// @access  Private

const committeeRequest = asyncHandler(async (req, res) => {
    let requests = await Request.find({ dcoApproved: true }).populate('user');
    if (requests) {
        res.json({
            message: "Successfully fetch",
            data: requests
        })
    } else {
        throw new Error("Request not created")
    }
});


// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const approvedByCommittee = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { committeApproved: true } })
        res.json({
            message: "Request has been approved",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Complaint not found");
    }
});


// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const rejectedByCommittee = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { committeApproved: false } })
        res.json({
            message: "Request has been rejected",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});


// @desc    committee complaints
// @route   GET  request
// @access  Private

const nocRequests = asyncHandler(async (req, res) => {
    let requests = await Request.find({ dcoApproved: true, committeApproved: true }).populate('user');
    if (requests) {
        res.json({
            message: "Successfully fetch",
            data: requests
        })
    } else {
        throw new Error("Request not created")
    }
});


// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const approvedByNoc = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { nocApproved: true } })
        res.json({
            message: "Request has been approved",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Complaint not found");
    }
});


// @desc    Approve Request By DCO
// @route   POST /request/approvedByDco/:_id
// @access  Private

const rejectedByNoc = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const request = await Request.findById(_id);
    if (request) {
        await Request.findOneAndUpdate({ _id }, { $set: { nocApproved: false } })
        res.json({
            message: "Request has been rejected",
            success: true
        })
    } else {
        res.status(404);
        throw new Error("Request not found");
    }
});



// @desc    All Request Approved by Noc
// @route   GET /request
// @access  Private

const allRequestAprrovedByNOC = asyncHandler(async (req, res) => {
    const requests = await Request.find({ nocApproved: true }).populate(
        'product user',
        'name lab ',
    );
    if (requests && requests.length > 0) {
        res.json(requests)
    } else {
        res.status(404);
        throw new Error("Complaints not found");
    }
});



module.exports = {
    addRequest, dcoRequests, approvedByDco, rejectedByDco, committeeRequest, approvedByCommittee, rejectedByCommittee, nocRequests, approvedByNoc, rejectedByNoc, allRequestAprrovedByNOC
};
