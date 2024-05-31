import React, { Component,Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashBoard from './Pages/Dashboard/DashBoard';
import CiscoCrisisResponse from './Pages/Pillars/CiscoCrisisResponse/CiscoCrisisResponse';
import CommunityImpact from './Pages/Pillars/CommunityImpact/CommunityImpact';
import Settings from './Pages/Settings/Settings';
import FiscalYears from './Pages/Portfolio/FiscalYears/FiscalYears';
import YearGoal from './Pages/Portfolio/FiscalYears/YearGoal/YearGoal';
import YearQTR from './Pages/Portfolio/FiscalYears/YearGoal/YearQTR/YearQTR';
import AboutSio from './Pages/AboutSio/AboutSio';
import ViewArticle from './Pages/AboutSio/Articles/List/ViewArticle/ViewArticle';
import Faqs from './Pages/FAQs/Faqs';
import ViewFaq from './Pages/FAQs/FaqList/ViewFaq/ViewFaq';
import Tags from './Pages/Portfolio/Tags/Tags';
import ListView from './Pages/Portfolio/Tags/TagsList/List/ListView/ListView';
import ProjectModule from './Components/ProjectModule/ProjectModule';
import Regions from './Components/Regions/Regions';
import ViewAction from './Components/ProjectModule/Actions/ViewAction/ViewAction';
import MemberDetails from './Components/ProjectModule/Team/MemberDetails/MemberDetails';
import ViewMetric from './Components/ProjectModule/MetricsDashboard/ViewMetric/ViewMetric'
import ViewInitiative from './Components/ProjectModule/MetricsDashboard/ViewInitiative/ViewInitiative';
import CountryView from './Components/Regions/CountryView/CountryView';
import ImpactGallery from './Pages/Portfolio/ImpactGallery/ImpactGallery';
import ViewPost from './Pages/Portfolio/ImpactGallery/ViewPost/ViewPost';
import MyTasks from './Pages/MyTasks/MyTasks';
import Profile from './Pages/Profile/Profile';
import TestingComponent from './Pages/TestingComponent/TestingComponent';
import ViewStrategy from './Components/ProjectModule/Actions/ViewAction/ActionTabs/Strategies/CreateStrategy/DeleteStrategy/ViewStrategy/ViewStrategy';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Pillars */}
        <Route path="/pillars/cisco-crisis-response" element={<CiscoCrisisResponse />} />
        <Route path="/pillars/community-impact" element={<CommunityImpact />} />

        {/* Portfolio */}
        <Route path="/portfolio/ig/:id/:name" element={<ImpactGallery />} />
        <Route path="/portfolio/ig/:id/:name/viewpost/:id/:name" element={<ViewPost />} />
        <Route path="/mytasks/viewpost/:id/:name" element={<ViewPost />} />


        <Route path="/portfolio/fy/:id/:name" element={<FiscalYears />} />
        <Route path="/portfolio/fy/:id/:name/yeargoal/:yearid/:yearname" element={<YearGoal />} />
        <Route path="/portfolio/fy/:id/:name/yeargoal/:yearid/:yearname/qtr/:qtrid/:qtrname" element={<YearQTR />} />
        <Route path="/mytasks/:yearid/:yearname" element={<YearGoal />} />
        <Route path="/portfolio/fy/yeargoal/:yearid/:yearname/qtr/:qtrid/:qtrname" element={<YearQTR />} />

        <Route path="/portfolio/tg/:id/:name" element={<Tags />} />
        <Route path="/portfolio/tg/:id/:name/:tagid/:tagname" element={<ListView />} />
        <Route path="/portfolio/tg/:rootid/:name/:tagid/:tagname/:id/:blogname" element={<ViewPost />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path="/help/aboutsio" element={<AboutSio />} />

        <Route path="/help/asio/:id/:name" element={<AboutSio />} />
        <Route path="/help/asio/:id/:name/article/:id/:articlename" element={<ViewArticle />} />
        <Route path="/article/:id/:articlename" element={<ViewArticle />} />
        
        <Route path="/help/faq/:id/:name" element={<Faqs />} />
        <Route path="/help/faqs/:id/:name" element={<ViewFaq />} />
        <Route path="/pillar/:id/:name" element={<ProjectModule />} />
        <Route path="/mytasks/pillar/:id/:name" element={<ProjectModule />} />
        <Route path="/region/:id/:name" element={<Regions />} />
        <Route path="/region/:id/:name/country/:countryId/:countryName" element={<CountryView />} />
        <Route path="/:category/:id/:name/:actionid/:actionname" element={<ViewAction />} />
        
        <Route path="/mytasks/action/:actionid/:actionname" element={<ViewAction />} />

        <Route path="/:category/:id/:name/team/:memberId/:memberName" element={<MemberDetails />} />
        <Route path="/:category/:id/:name/team/:memberId/" element={<MemberDetails />} />

        <Route path="/:category/:id/:name/:actionid/:actionname/team/:memberId/:memberName" element={<MemberDetails />} />
        <Route path="/dashboard/team/:memberId/:memberName" element={<MemberDetails />} />

        <Route path="/:category/:id/:name/metric/:metricId/" element={<ViewMetric />} />
        <Route path="/:category/:id/:name/metric/:metricId/:metricName" element={<ViewMetric />} />
        <Route path="/metric/:metricId/" element={<ViewMetric />} />
        <Route path="/metric/:metricId/:metricName" element={<ViewMetric />} />
        
        <Route path="/mytasks/metric/:metricId/" element={<ViewMetric />} />
        <Route path="/mytasks/metric/:metricId/:metricName" element={<ViewMetric />} />

        <Route path="/:category/:id/:name/initiative/:initiativeId/:initiativeName" element={<ViewInitiative />} />
        <Route path="/:category/:id/:name/:actionid/:actionname/initiative/:initiativeId/:initiativeName" element={<ViewInitiative />} />
        <Route path="/:category/:id/:name/:actionid/:actionname/strategy/:strategyid/:strategyname" element={<ViewStrategy />} />
        <Route path="/testingcomponent" element={<TestingComponent />} />
        
        {/* CountryView */}
      </Routes>
    </>
  )
}

export default AppRoutes
