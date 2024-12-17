const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect("mongodb+srv://mevadigamers:MFJCvdpsEZmrcxUh@cluster0.nsvul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log('connect');

const app = express();
app.use(express.json());
app.use(cors());
// For Available Stock
const AvailableStockSchema = new mongoose.Schema({
    item: String,
    quantity: Number,
    Rate: Number
});

const AvailableStockModel = new mongoose.model('Available_Stock', AvailableStockSchema);

app.post("/Admin", async (req, res) => {
    try {
        const bodyData = req.body;
        const Veg = new AvailableStockModel(bodyData);
        const Vegitable = await Veg.save();
        res.send('Added');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error adding data');
    }
});

app.get('/Vegitable', async (req, res) => {
    const data = await AvailableStockModel.find();
    res.send(data);
});

app.get('/GetOrderVeg/:id', async (req, res) => {

    const id = req.params.id;

    const orderveg = await AvailableStockModel.findById(id);

    res.send(orderveg);

});
app.put('/UpdateVegNow/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const up = await AvailableStockModel.findByIdAndUpdate(id, data);
    res.send('Updated');
})
app.delete('/DeleteVegNow/:id', async (req, res) => {
    const id = req.params.id;
    const del = await AvailableStockModel.findByIdAndDelete(id);
})
// For Orders
const OrderSchema = new mongoose.Schema({
    UserName: String,
    item: String,
    quantity: Number,
    Mobile: String,
    Email: String,
    EcjectAddress: String,
    Bill: Number
});
const OrderModel = mongoose.model('Orders', OrderSchema);

app.post('/TakeOrder', async (req, res) => {
    const Data = req.body;
    const dt = new OrderModel(Data);
    const dts = await dt.save();
    res.send('Added');
});
app.get('/Order', async (req, res) => {
    const order = await OrderModel.find();
    res.send(order);
});
app.get('/GetSingleUser/:id', async (req, res) => {
    const id = req.params.id;
    const orderveg = await OrderModel.findById(id);
    res.send(orderveg);
});

app.post('/FindforAssign', async (req, res) => {
    const ids = req.body.ids; // IDs को { ids: [...] } के रूप में भेजें
    try {
        const workdata = await OrderModel.find({ '_id': { $in: ids } });
        const deleold = await OrderModel.deleteMany({ '_id': { $in: ids } });
        res.send(workdata);

    } catch (error) {
        res.status(500).send('Server Error');
    }
});
//For Sign the Users and Accounts
const UserSchema = new mongoose.Schema({
    UserName: String,
    Email: String,
    Mobile: Number,
    Password: String,
    Address: String
});
const UserModel = mongoose.model('CustomerUser', UserSchema);
app.post("/SignUser", async (req, res) => {
    try {
        const Userdata = req.body;
        const cust = new UserModel(Userdata);
        const customer = await cust.save();
        res.send('Successfully Sign Up');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error adding data');
    }
});
app.get('/Login', async (req, res) => {
    const order = await UserModel.find();
    res.send(order);
});

// For Employees
const EmployeeSchema = new mongoose.Schema({
    UserName: String,
    Password: String,
    Code: String,
    Mobile: Number,
    Email: String,
    DOB: String,
    Gender: String,
    Address: String,
    Qualification: String,
    Experience: String,
    Licence: String,
    Aadhar: Number
});
const EmployeModel = new mongoose.model('Employee', EmployeeSchema);
app.post('/AdminRegistration', async (req, res) => {
    const data = req.body;
    const a = new EmployeModel(data);
    const b = await a.save();
    res.send('done')
})
app.get('/FindEmployee', async (req, res) => {
    const data = await EmployeModel.find();
    res.send(data);
});
app.get('/GetSingleEmloyee/:id', async (req, res) => {
    const id = req.params.id;
    const orderveg = await EmployeModel.findById(id);
    res.send(orderveg);
});
app.get('/EmployeeLogin/:UserName', async (req, res) => {
    const UserName = req.params.UserName;
    const result = await EmployeModel.findOne({ 'UserName': UserName });
    if (result) {
        res.send(result);
    }
    else {
        res.send('No data found');
    }

})
//For Employee Assigned Work
const AssignSchema = new mongoose.Schema({
    Employee: String,
    Customer: String,
    item: String,
    quantity: Number,
    Mobile: String,
    Email: String,
    EcjectAddress: String,
    Bill: Number,
    Assign: String
});
const AssignModel = new mongoose.model('WorkAssign', AssignSchema);
app.post('/AssignWorkNow', async (req, res) => {
    const Data = req.body;
    const result = await AssignModel.insertMany(Data);
    res.send("done");
});
app.get('/FindAssignedOrder', async (req, res) => {
    const order = await AssignModel.find();
    res.send(order);
});
app.get('/GetSingleOrder/:id', async (req, res) => {
    const id = req.params.id;
    const orderveg = await AssignModel.findById(id);
    res.send(orderveg);
});
app.get('/FindAssignOrdersForSignleEmployee/:Employee', async (req, res) => {
    const Employee = req.params.Employee;
    const a = await AssignModel.find({ 'Employee': Employee });
    res.send(a);

});
//For Admin
const AdminSchema = new mongoose.Schema({
    UserName: String,
    Mobile: Number,
    Email: String,
    Password: String
});
const AdminModel = new mongoose.model('Admin', AdminSchema);
app.get('/AdminLogin/:UserName', async (req, res) => {
    const UserName = req.params.UserName;

    const result = await AdminModel.findOne({ 'UserName': UserName });
    if (result) {
        res.send(result);
    }
    else {
        res.send('No data found');
    }
});
const accoutSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

// Creating twiio client
const client = new twilio(accoutSid, authToken);
app.post('/send-OTP', (req, res) => {
    const { to, message } = req.body;
    client.messages.create({
        body: message,
        to: to,
        from: '+18737103504'
    })
        .then((message) => {

            res.send(`msj send with sid:${message.sid}`)
        })
})
//For Employee Completed Work
const CompleteSchema = new mongoose.Schema({
    Employee: String,
    Customer: String,
    item: String,
    quantity: Number,
    Mobile: String,
    Email: String,
    EcjectAddress: String,
    Bill: Number,
    Assign: String
});
const CompletenModel = new mongoose.model('CompletedWork', CompleteSchema);
app.get('/FindCompletedOrder', async (req, res) => {
    const order = await CompletenModel.find();
    res.send(order);

});
app.post('/CompleteWorkNow', async (req, res) => {
    const Data = req.body;
    const id = req.body._id;
    const result = await CompletenModel(Data);
    const done = await result.save();
    const del = await AssignModel.findByIdAndDelete(id);
    res.send("done");
});
app.get('/FindCompletedOrdersForSignleEmployee/:Employee', async (req, res) => {
    const Employee = req.params.Employee;
    const a = await CompletenModel.find({ 'Employee': Employee });
    res.send(a);
});
app.get('/GetSingleCompletedOrder/:id', async (req, res) => {
    const id = req.params.id;
    const orderveg = await CompletenModel.findById(id);
    res.send(orderveg);
});
// For Big order 
const BigOrderSchema = mongoose.Schema({
    bigInputs: [
        {
            item: String,
            quantity: Number,
            Rate: Number
        }
    ],
    UserName: String,
    Contact: String,
    Email: String,
    Address: String,
    Bill: Number
});
const BigOrdersModel = new mongoose.model('Bigorders', BigOrderSchema);
app.post('/BigOrder', async (req, res) => {
    const Data = req.body;
    const order = new BigOrdersModel(Data);
    const big = await order.save();
    res.send('done');
})
app.get('/FindBigOrders', async (req, res) => {
    const data = await BigOrdersModel.find();
    res.send(data);
});
app.post('/FindBigOrderforAssign', async (req, res) => {
    const ids = req.body.ids; // IDs को { ids: [...] } के रूप में भेजें
    try {
        const workdata = await BigOrdersModel.find({ '_id': { $in: ids } });
        const deleold = await BigOrdersModel.deleteMany({ '_id': { $in: ids } });
        res.send(workdata);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

const AssignBigOrderSchema = mongoose.Schema({
    bigInputs: [
        {
            item: String,
            quantity: Number,
            Rate: Number
        }
    ],
    Employee: String,
    Customer: String,
    Contact: String,
    Email: String,
    Address: String,
    Bill: Number,
    Assign: String
});
const AssignBigOrdersModel = new mongoose.model('AssignBigorders', AssignBigOrderSchema);
app.post('/AssignbigOrderNow', async (req, res) => {
    const Data = req.body;
    const result = await AssignBigOrdersModel.insertMany(Data);
    res.send("done");
});
app.get('/FindAssignedBigOrders', async (req, res) => {
    const data = await AssignBigOrdersModel.find();
    res.send(data);
});
app.get('/FindAssignBigOrdersForSignleEmployee/:Employee', async (req, res) => {
    const Employee = req.params.Employee;
    const a = await AssignBigOrdersModel.find({ 'Employee': Employee });
    res.send(a);

});
app.get('/GetSingleBigOrder/:id', async (req, res) => {
    const id = req.params.id;
    const orderveg = await AssignBigOrdersModel.findById(id);
    res.send(orderveg);
});

// For completed Big Orders 
const CompletedBigOrderSchema = mongoose.Schema({
    bigInputs: [
        {
            item: String,
            quantity: Number,
            Rate: Number
        }
    ],
    Employee: String,
    Customer: String,
    Contact: String,
    Email: String,
    Address: String,
    Bill: Number,
    Assign: String
});
const CompletedBigOrdersModel = new mongoose.model('CompletedBigorders', CompletedBigOrderSchema);
app.post('/CompleteBidWorkNow', async (req, res) => {
    const Data = req.body;
    const id = req.body._id;
    const result = await CompletedBigOrdersModel(Data);
    const done = await result.save();
    const del = await AssignBigOrdersModel.findByIdAndDelete(id);
    res.send("done");
});
app.get('/FindCompletedBigOrdersForSignleEmployee/:Employee', async (req, res) => {
    const Employee = req.params.Employee;
    const a = await CompletedBigOrdersModel.find({ 'Employee': Employee });
    res.send(a);
});
app.get('/FindCompletedBigOrder', async (req, res) => {
    const order = await CompletedBigOrdersModel.find();
    res.send(order);

});

const dirname = path.resolve();
app.use(express.static(path.join(dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
})

app.listen(process.env.PORT);

