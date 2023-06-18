import emails from "../utils/sendEmail"

exports.controlAssignment = (Options, bus, res) => {
    emails.sendEmail(Options) 

    res.status(200).json({ 
        bus 
    });
}
