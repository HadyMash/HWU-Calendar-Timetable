import { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Home() {
  /* Things to implement
   * 1. from week n
   * 2. to week n
   * 3. detect overlaps for multiple classrooms for the same subject
   * 4. alerts before event
   */
  const coursesRef = useRef(null);
  const semesterRef = useRef(null);
  const startWeekRef = useRef(null);
  const endWeekRef = useRef(null);
  const alertRef = useRef(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingSubmit) return;

    const showErrorMessage = (message) => {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    };

    const courses = Array.from(coursesRef.current.selectedOptions).map(
      (option) => option.value,
    );
    const semester = semesterRef.current.value;
    const startWeek = startWeekRef.current.value;
    const endWeek = endWeekRef.current.value;
    const alert = alertRef.current.value;

    // validate
    let valid = true;

    if (!courses || courses.length === 0) {
      showErrorMessage('Please select at least one course');
      valid = false;
    }
    if (!semester) {
      showErrorMessage('Please select a semester');
      valid = false;
    }
    if (!startWeek) {
      showErrorMessage('Please select a start week');
      valid = false;
    }
    if (!endWeek) {
      showErrorMessage('Please select an end week');
      valid = false;
    }

    if (!valid) return;

    // make call to rest api
    setLoadingSubmit(true);
    try {
      const response = await axios.post('http://localhost:3000/timetable', {
        courses,
        semester,
        startWeek,
        endWeek,
        alert,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      showErrorMessage('Something went wrong, check console for log');
    } finally {
      setLoadingSubmit(false);
    }
  };
  const generateWeekOptions = () => {
    const options = new Array(12);

    for (let i = 1; i <= 12; i++) {
      options[i - 1] = (
        <option key={i} value={`Week ${i}`}>{`Week ${i}`}</option>
      );
    }

    return options;
  };

  return (
    <div className={'home'}>
      <div className={'welcome-text'}>
        <h1>Welcome to Heriot-Watt University Calendar Timetable</h1>
        <p>Please select your courses to add them to your calendar as events</p>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor={'courses'}>Courses:</label>
              </td>
              <td>
                {/* TODO: add search functionality*/}
                {/* TODO: allow users adding custom values own courses because the course ids also have Semesters in them (S1)*/}
                {/* TODO: get list of courses from server and store for a short while*/}
                <select
                  id={'courses'}
                  name="courses"
                  multiple="multiple"
                  size={8}
                  ref={coursesRef}
                >
                  <option value="B17CA-S1">
                    B17CA-S1 - Principles of Chemistry
                  </option>
                  <option value="B18AP-S1">
                    B18AP-S1 - Chemical Thermodynamics &amp; Introductory
                    Chemical Kinetics for Chemical Engineers
                  </option>
                  <option value="B27MW-S1">
                    B27MW-S1 - Mechanics, Fields and Forces
                  </option>
                  <option value="B30EI-S1">
                    B30EI-S1 - Advanced Analogue Electronics
                  </option>
                  <option value="B30EJ-S1">B30EJ-S1 - Linear Control</option>
                  <option value="B30UB-S1">
                    B30UB-S1 - 4th Year Project 1
                  </option>
                  <option value="B31DD-S1">B31DD-S1 - Embedded Systems</option>
                  <option value="B31GA-S1">
                    B31GA-S1 - Electrical Power Systems
                  </option>
                  <option value="B31SC-S1">
                    B31SC-S1 - Digital Signal Processing
                  </option>
                  <option value="B31YS-S1">
                    B31YS-S1 - Robotics Systems Science
                  </option>
                  <option value="B37EE-S1">
                    B37EE-S1 - Introduction to Electrical and Electronic
                    Engineering
                  </option>
                  <option value="B37VA-S1">
                    B37VA-S1 - Praxis Electronic Design
                  </option>
                  <option value="B38DB-S1">
                    B38DB-S1 - Digital Design and Programming
                  </option>
                  <option value="B38EB-S1">
                    B38EB-S1 - Circuits and Analysis
                  </option>
                  <option value="B39AX-S1">
                    B39AX-S1 - Engineering mathematics and statistics
                  </option>
                  <option value="B39ES-S1">
                    B39ES-S1 - Electrical Energy Systems
                  </option>
                  <option value="B39SA-S1">
                    B39SA-S1 - Signals and Systems
                  </option>
                  <option value="B39SE-S1">
                    B39SE-S1 - Semiconductor Electronics
                  </option>
                  <option value="B40DI-S1">
                    B40DI-S1 - Separation Processes C
                  </option>
                  <option value="B40DJ-S1">
                    B40DJ-S1 - Sustainability Management and Process Economics
                  </option>
                  <option value="B40DK-S1">
                    B40DK-S1 - Process Integration, Optimisation and Analysis
                  </option>
                  <option value="B40HE-AY">
                    B40HE-AY - Process Engineering Design Project
                  </option>
                  <option value="B41CE-S1">B41CE-S1 - Circular Economy</option>
                  <option value="B41OB-S1">
                    B41OB-S1 - Process Engineering A
                  </option>
                  <option value="B47AA-S1">
                    B47AA-S1 - Introduction to Process Engineering A
                  </option>
                  <option value="B47AE-S1">
                    B47AE-S1 - Engineering Professionalism and Technical
                    Communication
                  </option>
                  <option value="B47AF-AY">
                    B47AF-AY - Introduction to Process Engineering
                  </option>
                  <option value="B48BB-S1">B48BB-S1 - Fluid Mechanics</option>
                  <option value="B48BF-S1">
                    B48BF-S1 - Industrial Chemical Processes
                  </option>
                  <option value="B49CA-S1">
                    B49CA-S1 - Separation Processes A
                  </option>
                  <option value="B49CB-S1">
                    B49CB-S1 - Business Awareness, Safety and Sustainability
                  </option>
                  <option value="B49CC-S1">
                    B49CC-S1 - Chemical Reaction Engineering
                  </option>
                  <option value="B49CH-S1">B49CH-S1 - Process Control</option>
                  <option value="B49CJ-S1">
                    B49CJ-S1 - Sustainable Development and Engineering
                    Management
                  </option>
                  <option value="B50DG-S1">
                    B50DG-S1 - Engineering Design
                  </option>
                  <option value="B50EK-S1">B50EK-S1 - Fluids 1</option>
                  <option value="B50EM-S1">
                    B50EM-S1 - Advanced Mechanics of Materials 1
                  </option>
                  <option value="B50EO-S1">B50EO-S1 - Dynamics 1</option>
                  <option value="B50PA-S1">B50PA-S1 - Project 1</option>
                  <option value="B50TE-S1">
                    B50TE-S1 - Heat Exchangers and Heat Transfer
                  </option>
                  <option value="B51EK-S1">B51EK-S1 - Fluids 1</option>
                  <option value="B51EM-S1">
                    B51EM-S1 - Advanced Mechanics of Materials 1
                  </option>
                  <option value="B51EO-S1">B51EO-S1 - Dynamics 1</option>
                  <option value="B51ET-S1">
                    B51ET-S1 - Foundations of Energy
                  </option>
                  <option value="B51GE-S1">
                    B51GE-S1 - Renewable Energy Technologies
                  </option>
                  <option value="B51GG-S1">
                    B51GG-S1 - Computational Fluid Dynamics with Heat Transfer
                  </option>
                  <option value="B51GL-S1">
                    B51GL-S1 - Economics Ren Energy
                  </option>
                  <option value="B51TE-S1">
                    B51TE-S1 - Heat Exchangers and Heat Transfer
                  </option>
                  <option value="B57AS-S1">
                    B57AS-S1 - Mechanical Engineering in Context 1
                  </option>
                  <option value="B58DB-S1">
                    B58DB-S1 - Design and Manufacture 2
                  </option>
                  <option value="B58FB-S1">B58FB-S1 - Fluid Mechanics A</option>
                  <option value="B58SB-S1">
                    B58SB-S1 - Mechanics of Materials A
                  </option>
                  <option value="B59DE-S1">
                    B59DE-S1 - Design and Manufacture 3
                  </option>
                  <option value="B59FC-S1">B59FC-S1 - Fluid Mechanics B</option>
                  <option value="B59SC-S1">
                    B59SC-S1 - Mechanics of Materials B
                  </option>
                  <option value="B81PI-S1">
                    B81PI-S1 - Professional and Industrial Studies
                  </option>
                  <option value="B86EC-S1">B86EC-S1 - Entry Chemistry</option>
                  <option value="B86EM-S1">B86EM-S1 - Entry Mathematics</option>
                  <option value="B86EP-S1">B86EP-S1 - Entry Physics</option>
                  <option value="C10BS-S1">
                    C10BS-S1 - Business Project 1
                  </option>
                  <option value="C10HD-S1">
                    C10HD-S1 - Management Dissertation 1
                  </option>
                  <option value="C10IB-S1">
                    C10IB-S1 - Global Business Analysis 1: International Markets
                    and Strategy
                  </option>
                  <option value="C10IE-S1">
                    C10IE-S1 - International Entrepreneurship
                  </option>
                  <option value="C10LM-S1">C10LM-S1 - Leisure Marketing</option>
                  <option value="C10MB-S1">
                    C10MB-S1 - Managing Business Performance
                  </option>
                  <option value="C11BA-S1">
                    C11BA-S1 - Business Analytics and Introduction to Big Data
                  </option>
                  <option value="C11BC-S1">
                    C11BC-S1 - Management Consultancy
                  </option>
                  <option value="C11CC-S1">
                    C11CC-S1 - Contemporary Consumers
                  </option>
                  <option value="C11CS-S1">
                    C11CS-S1 - Competitive Strategy
                  </option>
                  <option value="C11DX-S1">
                    C11DX-S1 - Digital Customer Experience
                  </option>
                  <option value="C11FS-S1">
                    C11FS-S1 - Fundamentals of Lean Six Sigma
                  </option>
                  <option value="C11FT-S1">
                    C11FT-S1 - Freight Transport and Warehouse Management
                  </option>
                  <option value="C11IB-S1">
                    C11IB-S1 - International Business Context
                  </option>
                  <option value="C11IS-S1">
                    C11IS-S1 - International Strategic Marketing
                  </option>
                  <option value="C11IV-S1">
                    C11IV-S1 - Strategic Innovation Management
                  </option>
                  <option value="C11LD-S1">C11LD-S1 - Leadership</option>
                  <option value="C11LS-S1">
                    C11LS-S1 - Strategies for Managing Supply Chains
                  </option>
                  <option value="C11MG-S1">C11MG-S1 - Marketing</option>
                  <option value="C11OE-S1">
                    C11OE-S1 - Operations Management
                  </option>
                  <option value="C11OH-S1">
                    C11OH-S1 - Organisational Behaviour
                  </option>
                  <option value="C11SA-S1">
                    C11SA-S1 - Supply Chain Risk and Adaptation
                  </option>
                  <option value="C11SH-S1">C11SH-S1 - Strategic Change</option>
                  <option value="C11SP-S1">
                    C11SP-S1 - Strategic Project Management
                  </option>
                  <option value="C16AL-S1">
                    C16AL-S1 - Approaches to Learning
                  </option>
                  <option value="C16BM-S1">
                    C16BM-S1 - Business Management
                  </option>
                  <option value="C16LP-S1">
                    C16LP-S1 - Introduction to Leadership, Motivation and
                    Psychology
                  </option>
                  <option value="C17EB-S1">
                    C17EB-S1 - Management in a Global Context
                  </option>
                  <option value="C17MK-S1">
                    C17MK-S1 - Introduction to Marketing
                  </option>
                  <option value="C18FM-S1">
                    C18FM-S1 - Fundamentals of Marketing
                  </option>
                  <option value="C18HM-S1">
                    C18HM-S1 - Human Resource Management
                  </option>
                  <option value="C19BV-S1">
                    C19BV-S1 - Business Venturing
                  </option>
                  <option value="C19DA-S1">
                    C19DA-S1 - Digital Analytics in Marketing
                  </option>
                  <option value="C19EL-S1">C19EL-S1 - Employment Law</option>
                  <option value="C19GM-S1">
                    C19GM-S1 - Global Strategic Marketing
                  </option>
                  <option value="C19LS-S1">
                    C19LS-S1 - Logistics and Supply Chain Management
                  </option>
                  <option value="C19PT-S1">
                    C19PT-S1 - Project Management
                  </option>
                  <option value="C19RM-S1">
                    C19RM-S1 - Responsible Marketing
                  </option>
                  <option value="C19RT-S1">
                    C19RT-S1 - Resourcing and Talent Management
                  </option>
                  <option value="C30CX-S1">
                    C30CX-S1 - Agency Theory and Corporate Governance
                  </option>
                  <option value="C30DX-S1">
                    C30DX-S1 - Accounting and Finance Dissertation 1
                  </option>
                  <option value="C30HX-S1">C30HX-S1 - Accounting Theory</option>
                  <option value="C30MX-S1">
                    C30MX-S1 - Managerial Accounting: Decision Making
                  </option>
                  <option value="C31CF-S1">C31CF-S1 - Corporate Finance</option>
                  <option value="C31CG-S1">
                    C31CG-S1 - Corporate Governance and Sustainability
                  </option>
                  <option value="C31CM-S1">C31CM-S1 - Capital Markets</option>
                  <option value="C31FF-S1">
                    C31FF-S1 - Finance and Financial Reporting
                  </option>
                  <option value="C31FI-S1">
                    C31FI-S1 - Financial Accounting and Reporting
                  </option>
                  <option value="C31FM-S1">C31FM-S1 - Financial Markets</option>
                  <option value="C31FN-S1">
                    C31FN-S1 - Financial Analysis
                  </option>
                  <option value="C31FR-S1">
                    C31FR-S1 - Financial Reporting
                  </option>
                  <option value="C31IA-S1">
                    C31IA-S1 - International Accounting Standards
                  </option>
                  <option value="C37AF-S1">
                    C37AF-S1 - Introduction to Accounting and Finance
                  </option>
                  <option value="C38FI-S1">
                    C38FI-S1 - Fundamentals of Finance
                  </option>
                  <option value="C38PA-S1">
                    C38PA-S1 - Principles of Accounting
                  </option>
                  <option value="C38PF-S1">
                    C38PF-S1 - Personal Finance and Investment Ethics
                  </option>
                  <option value="C38SE-S1">
                    C38SE-S1 - Social and Environmental Accounting
                  </option>
                  <option value="C39AI-S1">
                    C39AI-S1 - Intermediate Financial Accounting
                  </option>
                  <option value="C39CN-S1">
                    C39CN-S1 - Mergers and Acquisitions
                  </option>
                  <option value="C39FN-S1">
                    C39FN-S1 - Corporate Financial Theory
                  </option>
                  <option value="C39FT-S1">
                    C39FT-S1 - Fundamentals of Financial Technology
                  </option>
                  <option value="C39MT-S1">
                    C39MT-S1 - Management Accounting Techniques and Decisions
                  </option>
                  <option value="C41CW-S1">
                    C41CW-S1 - Intercultural Communication in the Workplace
                  </option>
                  <option value="C47AS-S1">
                    C47AS-S1 - Academic English for Science and Engineering
                  </option>
                  <option value="C47EM-S1">
                    C47EM-S1 - Academic English for Management
                  </option>
                  <option value="C48IB-S1">
                    C48IB-S1 - Intercultural Issues in Business and Management
                  </option>
                  <option value="C67AS-S1">C67AS-S1 - Academic Skills</option>
                  <option value="C90CR-S1">
                    C90CR-S1 - Cognitive Rehabilitation
                  </option>
                  <option value="C90IP-S1">
                    C90IP-S1 - Industrial and Organisational Psychology
                  </option>
                  <option value="C90PB-S1">
                    C90PB-S1 - Workplace Psychology
                  </option>
                  <option value="C90PE-S1">
                    C90PE-S1 - Psychology of Education
                  </option>
                  <option value="C90PM-S1">
                    C90PM-S1 - Psychology with Management Research 1
                  </option>
                  <option value="C91CE-S1">
                    C91CE-S1 - Introduction to Human Factors
                  </option>
                  <option value="C91CP-S1">
                    C91CP-S1 - Coaching Psychology
                  </option>
                  <option value="C91OC-S1">
                    C91OC-S1 - Organisational Culture
                  </option>
                  <option value="C91SO-S1">
                    C91SO-S1 - Social and Organisational Change
                  </option>
                  <option value="C97NY-S1">
                    C97NY-S1 - Introduction to Psychology 1
                  </option>
                  <option value="C97RM-S1">
                    C97RM-S1 - Research Methods and Analysis 1
                  </option>
                  <option value="C97SP-S1">
                    C97SP-S1 - Academic Skills in Psychology
                  </option>
                  <option value="C98HD-S1">
                    C98HD-S1 - Developmental Psychology
                  </option>
                  <option value="C98PH-S1">
                    C98PH-S1 - Philosophy and History of Psychology
                  </option>
                  <option value="C98RU-S1">
                    C98RU-S1 - Research Methods and Analysis 3
                  </option>
                  <option value="C99CL-S1">
                    C99CL-S1 - Cognition across the Lifespan
                  </option>
                  <option value="C99CP-S1">
                    C99CP-S1 - Cross-Cultural Psychology
                  </option>
                  <option value="C99FY-S1">
                    C99FY-S1 - Forensic Psychology
                  </option>
                  <option value="C99IW-S1">
                    C99IW-S1 - Intelligence at Work
                  </option>
                  <option value="C99RH-S1">
                    C99RH-S1 - Research Methods and Analysis 5
                  </option>
                  <option value="D10LP-S1">
                    D10LP-S1 - Laboratory Project
                  </option>
                  <option value="D10YD-S1">
                    D10YD-S1 - Design Project (AE)
                  </option>
                  <option value="D10ZA-S1">D10ZA-S1 - Dissertation (AE)</option>
                  <option value="D11CA-S1">
                    D11CA-S1 - Climate Change, Sustainability and Adaptation
                  </option>
                  <option value="D11ST-S1">
                    D11ST-S1 - Sustainability for Construction Professionals
                  </option>
                  <option value="D11VE-S1">
                    D11VE-S1 - Ventilation and Air Conditioning
                  </option>
                  <option value="D18AB-S1">
                    D18AB-S1 - Acoustics and Architectural Design
                  </option>
                  <option value="D18PA-S1">D18PA-S1 - Design Project</option>
                  <option value="D19EL-S1">
                    D19EL-S1 - Electrical and Lighting Services for Buildings
                  </option>
                  <option value="D19SO-S1">
                    D19SO-S1 - Design Software Applications
                  </option>
                  <option value="D19TP-S1">
                    D19TP-S1 - Thermal Performance Studies
                  </option>
                  <option value="D20GB-S1">
                    D20GB-S1 - Geotechnics B- Geotechnical Applications
                  </option>
                  <option value="D20SE-S1">
                    D20SE-S1 - Structural Element Design
                  </option>
                  <option value="D20TB-S1">
                    D20TB-S1 - Highway Engineering
                  </option>
                  <option value="D20ZA-S1">
                    D20ZA-S1 - Dissertation 1 (Civil Engineering Programme)
                  </option>
                  <option value="D21EH-S1">
                    D21EH-S1 - Environmental Hydrology and Water Resources
                  </option>
                  <option value="D21SB-S1">
                    D21SB-S1 - Design and Analysis of Tall Steel Buildings
                  </option>
                  <option value="D27MA-S1">D27MA-S1 - Mechanics A</option>
                  <option value="D28DS-S1">
                    D28DS-S1 - Analysis of Determinate Structures
                  </option>
                  <option value="D28HA-S1">
                    D28HA-S1 - Hydraulics &amp; Hydrology A
                  </option>
                  <option value="D28SM-S1">D28SM-S1 - Surveying and GIS</option>
                  <option value="D29GS-S1">
                    D29GS-S1 - Geology and Soil Properties
                  </option>
                  <option value="D29IS-S1">
                    D29IS-S1 - Indeterminate Structures
                  </option>
                  <option value="D29SE-S1">
                    D29SE-S1 - Design of Steel Elements
                  </option>
                  <option value="D29TA-S1">
                    D29TA-S1 - Transport Design, Infrastructure and Society
                  </option>
                  <option value="D31AT-S1">
                    D31AT-S1 - Advanced Construction Technology
                  </option>
                  <option value="D31PT-S1">
                    D31PT-S1 - Project Management: Theory and Practice
                  </option>
                  <option value="D31SC-S1">
                    D31SC-S1 - Strategic Commercial and Contract Management
                  </option>
                  <option value="D31SQ-S1">
                    D31SQ-S1 - Service Procurement and Provision
                  </option>
                  <option value="D31TA-S1">
                    D31TA-S1 - Construction Technology
                  </option>
                  <option value="D31VR-S1">
                    D31VR-S1 - Value and Risk Management
                  </option>
                  <option value="D37TA-S1">
                    D37TA-S1 - Construction Technology 1
                  </option>
                  <option value="D38TA-S1">
                    D38TA-S1 - Construction Technology 2
                  </option>
                  <option value="D39PZ-S1">
                    D39PZ-S1 - Procurement and Contracts
                  </option>
                  <option value="D39TA-S1">
                    D39TA-S1 - Construction Technology 3
                  </option>
                  <option value="D41EP-S1">
                    D41EP-S1 - Urban Economy and Property Markets
                  </option>
                  <option value="D41VC-S1">
                    D41VC-S1 - Real Estate Appraisal and Finance
                  </option>
                  <option value="D47RE-S1">
                    D47RE-S1 - Real Estate and its Markets
                  </option>
                  <option value="D48VA-S1">
                    D48VA-S1 - Principles of Property Valuation
                  </option>
                  <option value="D49CA-S1">
                    D49CA-S1 - Contemporary Appraisal
                  </option>
                  <option value="D49IV-S1">
                    D49IV-S1 - Real Estate Investment
                  </option>
                  <option value="D57SA-S1">
                    D57SA-S1 - Shaping Tomorrow Together A
                  </option>
                  <option value="D60DA-S1">
                    D60DA-S1 - Dissertation (Architecture)
                  </option>
                  <option value="D60GA-S1">
                    D60GA-S1 - Architectural Design Studio 7
                  </option>
                  <option value="D67AA-S1">
                    D67AA-S1 - Architectural Design Studio 1
                  </option>
                  <option value="D68AR-S1">
                    D68AR-S1 - Architectural Representation
                  </option>
                  <option value="D68CA-S1">
                    D68CA-S1 - Architectural Design Studio 3
                  </option>
                  <option value="D68CB-S1">
                    D68CB-S1 - Architectural Design Studio C2
                  </option>
                  <option value="D69AI-S1">
                    D69AI-S1 - The Archaeology of Ideas
                  </option>
                  <option value="D69EA-S1">
                    D69EA-S1 - Architectural Design Studio 5
                  </option>
                  <option value="D69TP-S1">
                    D69TP-S1 - Integrated Technology 1
                  </option>
                  <option value="E10CA-S1">E10CA-S1 - Honours Project</option>
                  <option value="E10IG-S1">
                    E10IG-S1 - Final Major Project Part 1
                  </option>
                  <option value="E10MG-S1">
                    E10MG-S1 - Global Fashion Management
                  </option>
                  <option value="E10MS-S1">
                    E10MS-S1 - Marketing Strategy for Design
                  </option>
                  <option value="E10TA-S1">E10TA-S1 - CCS Essay</option>
                  <option value="E11DP-S1">
                    E11DP-S1 - Interior Architecture Tectonics, Tools and
                    Technology
                  </option>
                  <option value="E11DY-S1">
                    E11DY-S1 - Design Thinking and Innovation
                  </option>
                  <option value="E11ST-S1">E11ST-S1 - Strategic Design</option>
                  <option value="E11SU-S1">
                    E11SU-S1 - Sustainable Design &amp; Management
                  </option>
                  <option value="E16DS-S1">
                    E16DS-S1 - Introduction to Design Studies
                  </option>
                  <option value="E17DD-S1">
                    E17DD-S1 - Rethinking Design 2: Develop and Deliver
                  </option>
                  <option value="E17DI-S1">
                    E17DI-S1 - Rethinking Design 1: Discover and Define
                  </option>
                  <option value="E18AD-S1">
                    E18AD-S1 - CAD for Design 1 AutoCAD
                  </option>
                  <option value="E18BB-S1">E18BB-S1 - Branding</option>
                  <option value="E18CB-S1">
                    E18CB-S1 - Consumer Behaviour
                  </option>
                  <option value="E18CI-S1">
                    E18CI-S1 - Construction for Interior Architecture
                  </option>
                  <option value="E18IC-S1">
                    E18IC-S1 - Design Studio 1 Residential Design
                  </option>
                  <option value="E18IP-S1">
                    E18IP-S1 - Intermediate Photography
                  </option>
                  <option value="E18TH-S1">
                    E18TH-S1 - Creative Digital Technologies
                  </option>
                  <option value="E19AS-S1">
                    E19AS-S1 - Art Direction and Storytelling
                  </option>
                  <option value="E19BB-S1">E19BB-S1 - Design Branding</option>
                  <option value="E19DS-S1">
                    E19DS-S1 - CAD for Design 3 Revit
                  </option>
                  <option value="E19ET-S1">
                    E19ET-S1 - Enterprise and Innovation for Creative Industries
                  </option>
                  <option value="E19FW-S1">
                    E19FW-S1 - Journalism content creation
                  </option>
                  <option value="E19IE-S1">
                    E19IE-S1 - Design Studio 3 Service Industry Design
                  </option>
                  <option value="E19IM-S1">
                    E19IM-S1 - Fashion Image Making
                  </option>
                  <option value="E19TA-S1">
                    E19TA-S1 - Future Textiles &amp; Apparel
                  </option>
                  <option value="F10DA-S1">F10DA-S1 - Data Assimilation</option>
                  <option value="F10MM-S1">F10MM-S1 - Optimisation</option>
                  <option value="F17CA-S1">F17CA-S1 - Calculus A</option>
                  <option value="F17LP-S1">F17LP-S1 - Logic and Proof</option>
                  <option value="F17XA-S1">
                    F17XA-S1 - Mathematics for Engineers and Scientists 1
                  </option>
                  <option value="F18CD-S1">
                    F18CD-S1 - Multivariable Calculus and Real Analysis A
                  </option>
                  <option value="F18CF-S1">F18CF-S1 - Linear Algebra</option>
                  <option value="F18XC-S1">
                    F18XC-S1 - Mathematics for Engineers and Scientists 3
                  </option>
                  <option value="F20BC-S1">
                    F20BC-S1 - Biologically Inspired Computation
                  </option>
                  <option value="F20CN-S1">
                    F20CN-S1 - Computer Network Security
                  </option>
                  <option value="F20DL-S1">
                    F20DL-S1 - Data Mining and Machine Learning
                  </option>
                  <option value="F20DV-S1">
                    F20DV-S1 - Data Visualisation and Analytics
                  </option>
                  <option value="F20GA-S1">
                    F20GA-S1 - 3D Graphics and Animation
                  </option>
                  <option value="F20IF-S1">
                    F20IF-S1 - Information Systems Methodologies
                  </option>
                  <option value="F20ML-S1">
                    F20ML-S1 - Statistical Machine Learning
                  </option>
                  <option value="F20PA-S1">
                    F20PA-S1 - Research Methods &amp; Requirements Engineering
                  </option>
                  <option value="F20RO-S1">
                    F20RO-S1 - Intelligent Robotics
                  </option>
                  <option value="F20RS-S1">
                    F20RS-S1 - Rigorous Methods for Software Engineering
                  </option>
                  <option value="F20SA-S1">
                    F20SA-S1 - Statistical Modelling and Analysis
                  </option>
                  <option value="F20SC-S1">
                    F20SC-S1 - Industrial Programming
                  </option>
                  <option value="F21BC-S1">
                    F21BC-S1 - Biologically Inspired Computation
                  </option>
                  <option value="F21CN-S1">
                    F21CN-S1 - Computer Network Security
                  </option>
                  <option value="F21DF-S1">
                    F21DF-S1 - Databases and Information Systems
                  </option>
                  <option value="F21DL-S1">
                    F21DL-S1 - Data Mining and Machine Learning
                  </option>
                  <option value="F21DV-S1">
                    F21DV-S1 - Data Visualisation and Analytics
                  </option>
                  <option value="F21GA-S1">
                    F21GA-S1 - 3D Graphics and Animation
                  </option>
                  <option value="F21IF-S1">
                    F21IF-S1 - Information Systems Methodologies
                  </option>
                  <option value="F21MC-S1">
                    F21MC-S1 - Mobile Communications &amp; Programming
                  </option>
                  <option value="F21RO-S1">
                    F21RO-S1 - Intelligent Robotics
                  </option>
                  <option value="F21RS-S1">
                    F21RS-S1 - Rigorous Methods for Software Engineering
                  </option>
                  <option value="F21SA-S1">
                    F21SA-S1 - Statistical Modelling and Analysis
                  </option>
                  <option value="F21SC-S1">
                    F21SC-S1 - Industrial Programming
                  </option>
                  <option value="F21SF-S1">
                    F21SF-S1 - Software Engineering Foundations
                  </option>
                  <option value="F26EC-AY">
                    F26EC-AY - Entry Computer Science
                  </option>
                  <option value="F27ID-S1">
                    F27ID-S1 - Introduction to Interaction Design
                  </option>
                  <option value="F27PX-S1">F27PX-S1 - Praxis</option>
                  <option value="F27SA-S1">
                    F27SA-S1 - Software Development 1
                  </option>
                  <option value="F27SP-S1">
                    F27SP-S1 - Introduction to Programming 1
                  </option>
                  <option value="F28ED-S1">
                    F28ED-S1 - User-Centred Experimental Design
                  </option>
                  <option value="F28PL-S1">
                    F28PL-S1 - Programming Languages
                  </option>
                  <option value="F28SG-S1">
                    F28SG-S1 - Introduction to Data Structures &amp; Algorithms
                  </option>
                  <option value="F28SH-S1">
                    F28SH-S1 - Programming for Data Analysis
                  </option>
                  <option value="F28WP-S1">F28WP-S1 - Web Programming</option>
                  <option value="F29AI-S1">
                    F29AI-S1 - Artificial Intelligence and Intelligent Agents
                  </option>
                  <option value="F29DC-S1">
                    F29DC-S1 - Data Communications and Networking
                  </option>
                  <option value="F29FA-S1">F29FA-S1 - Foundations 1</option>
                  <option value="F29KM-S1">
                    F29KM-S1 - Knowledge Management
                  </option>
                  <option value="F29SO-S1">
                    F29SO-S1 - Software Engineering
                  </option>
                  <option value="F70DA-S1">
                    F70DA-S1 - Statistics Dissertation A
                  </option>
                  <option value="F70SC-S1">
                    F70SC-S1 - Statistical Computing
                  </option>
                  <option value="F77SA-S1">
                    F77SA-S1 - Topics in Statistical Practice
                  </option>
                  <option value="F78AA-S1">
                    F78AA-S1 - Actuarial and Financial Mathematics A
                  </option>
                  <option value="F78AP-S1">
                    F78AP-S1 - Algorithmic and Scientific Programming
                  </option>
                  <option value="F78PA-S1">
                    F78PA-S1 - Probability and Statistics A
                  </option>
                  <option value="F78QT-S1">
                    F78QT-S1 - Quantitative Methods 1
                  </option>
                  <option value="F79PS-S1">
                    F79PS-S1 - Further Statistical Methods
                  </option>
                  <option value="G10UG-S1">
                    G10UG-S1 - Introduction to Petroleum Engineering
                  </option>
                  <option value="G11DE-S1">
                    G11DE-S1 - Drilling Engineering
                  </option>
                  <option value="G11FE-S1">
                    G11FE-S1 - Formation Evaluation
                  </option>
                  <option value="G11PG-S1">
                    G11PG-S1 - Geoscience for Petroleum Engineering
                  </option>
                  <option value="G11RE-S1">
                    G11RE-S1 - Reservoir Engineering
                  </option>
                  <option value="H11EB-AY">
                    H11EB-AY - Economics for Business
                  </option>
                  <option value="H11EN-S1">
                    H11EN-S1 - Entrepreneurship &amp; Creativity
                  </option>
                  <option value="H11FM-AY">
                    H11FM-AY - Financial Decision Making
                  </option>
                  <option value="H11PW-AY">
                    H11PW-AY - People, Work and Organisations
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'semester'}>Semester:</label>
              </td>
              <td>
                <select
                  id={'semester'}
                  name="semester"
                  defaultValue={'September Semester'}
                  ref={semesterRef}
                >
                  <option value="September Semester">September Semester</option>
                  <option value="January Semester">January Semester</option>
                  {/* TODO: add support for may and may dep semesters */}
                  {/*<option value="36;37;38;39;40;41;42;43;44;45;46;47">*/}
                  {/*  May Semester*/}
                  {/*</option>*/}
                  {/*<option value="32;33;34;35;36;37;39;40">*/}
                  {/*  May Semester - DEP*/}
                  {/*</option>*/}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'start-week'}>From week:</label>
              </td>
              <td>
                <select
                  id={'start-week'}
                  name={'start-week'}
                  defaultValue={'Week 1'}
                  ref={startWeekRef}
                >
                  {generateWeekOptions()}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'end-week'}>To week:</label>
              </td>
              <td>
                <select
                  id={'end-week'}
                  name={'end-week'}
                  defaultValue={'Week 12'}
                  ref={endWeekRef}
                >
                  {generateWeekOptions(false)}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'alert'}>Default alert:</label>
              </td>
              <td>
                <select id={'alert'} name="alert" ref={alertRef}>
                  {/* TODO: add more options */}
                  <option value="0">None</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={loadingSubmit}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
