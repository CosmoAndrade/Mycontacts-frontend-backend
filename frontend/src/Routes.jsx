import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

function RoutesApp() {
    return (

        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewContact />} />
            <Route path="/edit/:id" element={<EditContact />} />

        </Routes>

    );
}

export default RoutesApp;
