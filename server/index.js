const http = require('http');
const {connectDb} = require('./Database/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT;


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});