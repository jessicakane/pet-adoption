import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {HomePage} from './components/pages/HomePage';
import {MyPetsPage} from './components/pages/MyPetsPage';
import {PetsPage} from './components/pages/PetsPage';
import {NavBar} from './components/NavBar';
import {AuthContextProvider} from './context/AuthContextProvider';
import {ProfileSettings} from './components/pages/ProfileSettings';
import {MyPetsContextProvider} from './context/MyPetsContextProvider';
import {PetsContextProvider} from './context/PetsContextProvider';
import {UsersPage} from './components/pages/UsersPage';
import {PetsFeatured} from './components/pages/PetsFeatured';
import {PetsFeaturedContextProvider} from './context/PetsFeaturedContextProvider';
import {LikesContextProvider} from './context/LikesContextProvider';
import { AdoptionRequests } from './components/AdoptionRequests';
import { MyAdoptionRequests } from './components/MyAdoptionRequests';
import {RequestsContextProvider} from './context/RequestsContextProvider';

function App() {

    // TODO frontend:
    // fix search to include hypoallergenic
    // fix hypoallergenic default when adding new pet
    // call authcontext in pet context instead of passing token as parameter

    return (
        <AuthContextProvider>
            <MyPetsContextProvider>
            <PetsFeaturedContextProvider>
                <PetsContextProvider>
                    <RequestsContextProvider>
                    
                        <LikesContextProvider>
                            <BrowserRouter>
                                <div className="App">
                                    <NavBar/>
                                    <Routes>
                                        <Route path='/'
                                            element={<HomePage/>}/>
                                        <Route path='/mypets'
                                            element={<MyPetsPage/>}/>
                                        <Route path='pets'
                                            element={<PetsPage/>}/>
                                        <Route path='/profilesettings'
                                            element={<ProfileSettings/>}/>
                                        <Route path='/users'
                                            element={<UsersPage/>}/>
                                        <Route path='/petsfeatured'
                                            element={<PetsFeatured/>}/>
                                        <Route path = '/requests' element={<AdoptionRequests/>}/>
                                        <Route path = 'myrequests' element = {< MyAdoptionRequests />}/>
                                    </Routes>

                                </div>
                            </BrowserRouter>
                        </LikesContextProvider>
                        </RequestsContextProvider>
                </PetsContextProvider>
                </PetsFeaturedContextProvider>
            </MyPetsContextProvider>
            
        </AuthContextProvider>
    );
}

export default App;
