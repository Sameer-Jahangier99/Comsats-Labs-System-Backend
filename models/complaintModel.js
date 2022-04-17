const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "progress"
        },
        dcoApproved: {
            type: Boolean,

            default: null
        },
        committeApproved: {
            type: Boolean,

            default: null
        },
        nocApproved: {
            type: Boolean,

            default: null
        },
        worksApproved: {
            type: Boolean,

            default: null
        },

        title: {
            type: String,
            required: true,
        },
        lab: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);


const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
