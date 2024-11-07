import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import DishForm from './components/DishForm';
import SupplierForm from './components/SupplierForm';
import IngredientForm from './components/IngredientForm';
import ClientForm from './components/ClientForm';
import UsageRelationship from './components/UsageRelationship';
import Sales from './components/Sales';
import Reports from './components/Reports';
import PriceAdjustment from './components/PriceAdjustment'; 
import Raffle from './components/Raffle';
import UsePoints from './components/UsePoints'; 
import UserManagement from './components/UserManagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dish-form" element={<DishForm />} />
                <Route path="/supplier-form" element={<SupplierForm />} />
                <Route path="/ingredient-form" element={<IngredientForm />} />
                <Route path="/client-form" element={<ClientForm />} />
                <Route path="/usage-relationship" element={<UsageRelationship />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/price-adjustment" element={<PriceAdjustment />} /> 
                <Route path="/raffle" element={<Raffle />} />
                <Route path="/use-points" element={<UsePoints />} /> 
                <Route path="/user-management" element={<UserManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
