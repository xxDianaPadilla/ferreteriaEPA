import express from 'express';
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import providersRoutes from "./src/routes/providers.js";
import brandsRoutes from "./src/routes/brands.js";
import cookieParser from "cookie-parser";
import authRoutes from './src/routes/authRoutes.js';
import faqsRoutes from './src/routes/faqsRoutes.js';
import claimsRoutes from "./src/routes/claims.js";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from 'path';

const app = express();

app.use(
    cors({
        origin: "https://ferreteria-epa-diana.vercel.app",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./ferreteriaEPA.json"), "utf-8")
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/registerEmployee", registerEmployeeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/recoveryPassword", recoveryPasswordRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api", authRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/claims", claimsRoutes);

export default app;