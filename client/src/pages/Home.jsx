export function Home() {
  /* Things to implement
   * 1. from week n
   * 2. to week n
   * 3. detect overlaps for multiple classrooms for the same subject
   * 4. alerts before event
   */

  return (
    <div className={'home'}>
      <div className={'welcome-text'}>
        <h1>Welcome to Heriot-Watt University Calendar Timetable</h1>
        <p>Enter your courses to add them to your calendar as events</p>
      </div>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor={'student-group'}>Student Group:</label>
              </td>
              <td>
                <select id={'student-group'} name={'student-group'}>
                  <option value="B311-1">
                    B311-EEE - BEng Electrical and Electronic Engineering - Year
                    1 - September Semester
                  </option>
                  <option value="#SPLUSA0306F">
                    B311-EEE - BEng Electrical and Electronic Engineering - Year
                    2 - September Semester
                  </option>
                  <option value="#SPLUSA03070">
                    B311-EEE - BEng Electrical and Electronic Engineering - Year
                    3 - September Semester
                  </option>
                  <option value="#SPLUSA03071">
                    B311-EEE - BEng Electrical and Electronic Engineering - Year
                    4 - September Semester
                  </option>
                  <option value="#SPLUSCD340D">
                    B320-RAI - MSc. Robotics - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSE76D3A">
                    B344-RAI - BEng Robotic Auton &amp; Inter Sys - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS0A5AEA">
                    B344-RAI - BEng Robotic Auton &amp; Inter Sys - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS91DEEE">
                    B344-RAI - BEng Robotic Auton &amp; Inter Sys - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUSCD340C">
                    B344-RAI - BEng Robotic Auton &amp; Inter Sys - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS14BA7B">
                    B411-CEN - BEng in Chemical Engineering - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS889840">
                    B411-CEN - BEng in Chemical Engineering - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUSA60092">
                    B411-CEN - BEng in Chemical Engineering - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS1CA64F">
                    B411-CEN - BEng in Chemical Engineering - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS8AA177">
                    B478-SUE - MSc Global Sustainability - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUSA03059">
                    B511-MEG - BEng Mech Eng - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSA0306B">
                    B511-MEG - BEng Mech Eng - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSA03054">
                    B511-MEG - BEng Mech Eng - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSA0307A">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Dynamics &amp; Thermo options)
                  </option>
                  <option value="#SPLUSA03076">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Fluids &amp; Dynamics options)
                  </option>
                  <option value="#SPLUSA03072">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Fluids &amp; Materials options)
                  </option>
                  <option value="#SPLUSA03077">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Fluids &amp; Thermo options)
                  </option>
                  <option value="#SPLUSA03078">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Materials &amp; Dynamics options)
                  </option>
                  <option value="#SPLUSA03079">
                    B511-MEG - BEng Mech Eng - Year 4 - September Semester
                    (Materials &amp; Thermo options)
                  </option>
                  <option value="#SPLUS14B07F">
                    B542-MEE - BEng Mech Eng &amp; Energy Eng - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS403E10">
                    B542-MEE - BEng Mech Eng &amp; Energy Eng - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS8214D2">
                    B542-MEE - BEng Mech Eng &amp; Energy Eng - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUS590F56">
                    B542-MEE - BEng Mech Eng &amp; Energy Eng - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUSA03056">
                    B564-AUE - BEng Automotive Eng - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSA03058">
                    B564-AUE - BEng Automotive Eng - Year 2 - September Semester
                  </option>
                  <option value="#SPLUSA0306C">
                    B564-AUE - BEng Automotive Eng - Year 3 - September Semester
                  </option>
                  <option value="#SPLUSA03073">
                    B564-AUE - BEng Automotive Eng - Year 4 - September Semester
                    (Fluids option)
                  </option>
                  <option value="#SPLUSA03074">
                    B564-AUE - BEng Automotive Eng - Year 4 - September Semester
                    (Materials option)
                  </option>
                  <option value="#SPLUSA03075">
                    B564-AUE - BEng Automotive Eng - Year 4 - September Semester
                    (Thermo option)
                  </option>
                  <option value="#SPLUSA5B488">
                    B5A7-AME - MSc Adv Mech Eng - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS89BA23">
                    B5B7-ENE - MSc in Energy - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSD267CF">
                    B5E7-REE - MSc in Renewable Energy Engineering - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS068A4A">
                    B7A4-COS - BSc Combined Studies NG - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS84BBE5">
                    C112-OPM - MSc Operations Management - September Semester
                  </option>
                  <option value="#SPLUS14B647">
                    C115-BLC - MSc in Business Strategy, LC - September Semester
                  </option>
                  <option value="#SPLUS5E42F0">
                    C131-BSA - MSc Analytic + Consultancy - September Semester
                  </option>
                  <option value="#SPLUS2E91AC">
                    C147-SPM - MSc Strategic Project Management - September
                    Semester
                  </option>
                  <option value="#SPLUSC090F8">
                    C177-IFM - MSc International Fashion Marketing - September
                    Semester
                  </option>
                  <option value="#SPLUS2E91B0">
                    C187-HRM - MSc International Business Management with HRM -
                    September Semester
                  </option>
                  <option value="#SPLUS84BBE7">
                    C1A4-LSS - MSc Logistics &amp; Supply Chain Management with
                    Lean Six Sigma - September Semester
                  </option>
                  <option value="#SPLUS2E91B3">
                    C1A7-LSC - MSc Logistics &amp; Supply Chain Management -
                    September Semester
                  </option>
                  <option value="#SPLUSA2AA83">
                    C1BA-BBA - Bachelor of Business Admin (Hons) - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS2E911C">
                    C1BA-BBA - Bachelor of Business Admin (Hons) - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS59AC52">
                    C1BA-BBA - Bachelor of Business Admin (Hons) - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUSE0C451">
                    C1BA-BBA - Bachelor of Business Admin (Hons) - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS183E3A">
                    C1BB-BBA - Bachelor of Business Admin - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E3B">
                    C1BB-BBA - Bachelor of Business Admin - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E3C">
                    C1BB-BBA - Bachelor of Business Admin - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS65A60F">
                    C1D1-DIG - MSc Digital Marketing - September Semester
                  </option>
                  <option value="#SPLUS2E91AE">
                    C1E7-MKG - MSc International Business Management with
                    Marketing - September Semester
                  </option>
                  <option value="#SPLUS2E91AF">
                    C1G7-FIN - MSc International Business Management with
                    Finance - September Semester
                  </option>
                  <option value="#SPLUS2D37C3">
                    C1GM-IBM - MA International Business Management - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS2D37C4">
                    C1GM-IBM - MA International Business Management - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS2D383B">
                    C1GM-IBM - MA International Business Management - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUS96F1E3">
                    C1GM-IBM - MA International Business Management - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS365BEB">
                    C1GN-IBM - BA International Business Management - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS5F1DBF">
                    C1GN-IBM - BA International Business Management - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUSA299B7">
                    C1H1-IMI - MSc in Industrial Mgt - September Semester
                  </option>
                  <option value="#SPLUS7B0372">
                    C1I1-MNN - MSc in Managing Innovation - September Semester
                  </option>
                  <option value="#SPLUS5F1BD2">
                    C1IM-IBK - MA International Business Management with
                    Marketing - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS5F1C4E">
                    C1IM-IBK - MA International Business Management with
                    Marketing - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS5F1C4F">
                    C1IM-IBK - MA International Business Management with
                    Marketing - Year 4 - September Semester
                  </option>
                  <option value="#SPLUSA1A28A">
                    C1JM-IBH - MA International Business Management with Human
                    Resource Management - Year 1- September Semester
                  </option>
                  <option value="#SPLUS9DB47D">
                    C1JM-IBH - MA International Business Management with Human
                    Resource Management - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS9DB47E">
                    C1JM-IBH - MA International Business Management with Human
                    Resource Management - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS9DB47F">
                    C1JM-IBH - MA International Business Management with Human
                    Resource Management - Year 4 - September Semester
                  </option>
                  <option value="#SPLUS939D34">
                    C1KM-IBE - MA International Business Management with
                    Enterprise - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS939D47">
                    C1KM-IBE - MA International Business Management with
                    Enterprise - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS939DDA">
                    C1KM-IBE - MA International Business Management with
                    Enterprise - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS5F1BCA">
                    C1KM-IBE - MA International Business Management with
                    Enterprise - Year 4 - September Semester
                  </option>
                  <option value="#SPLUSA2EC2E">
                    C1M2-MAR - MA in Marketing - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS51186B">
                    C1M2-MAR - MA in Marketing - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS91AF8B">
                    C1M2-MAR - MA in Marketing - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS5F1BD4">
                    C1NM-OPL - MA International Business Management with
                    Operations - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS5F1BD3">
                    C1NM-OPL - MA International Business Management with
                    Operations - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS5F1C50">
                    C1NM-OPL - MA International Business Management with
                    Operations - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS37D512">
                    C1NM-OPL - MA International Business Management with
                    Operations - Year 4 - September Semester
                  </option>
                  <option value="#SPLUSD33BEE">
                    C1RD-IDM - MSc in International Marketing with Digital
                    Marketing - September Semester
                  </option>
                  <option value="#SPLUS65A701">
                    C1RK-IMK - MSc International Marketing - September Semester
                  </option>
                  <option value="#SPLUS7BB414">
                    C301-ABF - MA Accounting and Business Finance - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS5F1EEA">
                    C301-ABF - MA Accounting and Business Finance - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUS80D8D0">
                    C301-ABF - MA Accounting and Business Finance - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS829546">
                    C311-ACF - BA Accountancy &amp; Finance - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E5A">
                    C311-ACF - BA Accountancy &amp; Finance - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS4FDB93">
                    C31M-ACF - MA Accountancy &amp; Finance - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E5D">
                    C31M-ACF - MA Accountancy &amp; Finance - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E5B">
                    C31M-ACF - MA Accountancy &amp; Finance - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS47E966">
                    C31M-ACF - MA Accountancy &amp; Finance - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS6295E6">
                    C327-FIM - MSc in Finance &amp; Mangement - September
                    Semester
                  </option>
                  <option value="#SPLUS8788E7">
                    C32F-FIN - MA Finance - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS5117CD">
                    C32F-FIN - MA Finance - Year 2 - September Semester
                  </option>
                  <option value="#SPLUSBCB45C">
                    C32F-FIN - MA Finance - Year 3 - September Semester
                  </option>
                  <option value="#SPLUS51188E">
                    C34M-ACC - MA in Accountancy - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS878878">
                    C34M-ACC - MA in Accountancy - Year 1 - September Semester
                  </option>
                  <option value="#SPLUS2FB42C">
                    C371-BUF - BA Business &amp; Finance - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS47E967">
                    C371-BUF - BA Business &amp; Finance - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS47E968">
                    C371-BUF - BA Business &amp; Finance - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS2E91B1">
                    C377-IAF - MSc in International Accounting and Finance -
                    September Semester
                  </option>
                  <option value="#SPLUS2FB42D">
                    C37M-BUF - MA Business &amp; Finance - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E55">
                    C37M-BUF - MA Business &amp; Finance - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E56">
                    C37M-BUF - MA Business &amp; Finance - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS183E57">
                    C37M-BUF - MA Business &amp; Finance - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS2E91B2">
                    C387-FIN - MSc in Finance - September Semester
                  </option>
                  <option value="#SPLUS5E4294">
                    C3A1-AAC - MSc in Applied Accounting - September Semester
                  </option>
                  <option value="#SPLUSF8B2B4">
                    C912-PSY - BSc Psychology - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSF8B2B7">
                    C912-PSY - BSc Psychology - Year 2 - September Semester
                    (Fundamentals of Marketing option)
                  </option>
                  <option value="#SPLUSF8B2C7">
                    C912-PSY - BSc Psychology - Year 2 - September Semester
                    (Human Resource Management option)
                  </option>
                  <option value="#SPLUS78C346">
                    C912-PSY - BSc Psychology - Year 3 - September Semester
                  </option>
                  <option value="#SPLUSB2BD08">
                    C912-PSY - BSc Psychology - Year 4 - September Semester
                  </option>
                  <option value="#SPLUS7FED97">
                    C913-PWM - BSc Psychology with Management - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS764661">
                    C913-PWM - BSc Psychology with Management - Year 2 -
                    September Semester (Fundamentals of Marketing option)
                  </option>
                  <option value="#SPLUS764660">
                    C913-PWM - BSc Psychology with Management - Year 2 -
                    September Semester (Human Resource Management option)
                  </option>
                  <option value="#SPLUS1F987A">
                    C913-PWM - BSc Psychology with Management - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUS5A8ED8">
                    C913-PWM - BSc Psychology with Management - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS62D139">
                    C9P7-PRB - MSc Business Psychology - September Semester
                  </option>
                  <option value="#SPLUSC50068">
                    C9R7-PSC - MSc Business Psychology with Coaching - September
                    Semester
                  </option>
                  <option value="#SPLUS62E105">
                    D1B1-AEN - BEng Architectural Engineering - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUS46100A">
                    D1B1-AEN - BEng Architectural Engineering - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS46A159">
                    D1B1-AEN - BEng Architectural Engineering - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUS480F79">
                    D1B1-AEN - BEng Architectural Engineering - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUSFFC981">
                    D211-CIE - BEng Civil Engineering - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS62E107">
                    D211-CIE - BEng Civil Engineering - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS62E108">
                    D211-CIE - BEng Civil Engineering - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS460FE9">
                    D211-CIE - BEng Civil Engineering - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUSAE12C7">
                    D2J7-CEC - MSc Civil Engineering and Construction Management
                    - September Semester
                  </option>
                  <option value="#SPLUSDA3F91">
                    D307-CMQ - MSc. Commercial Management and Quantity Surveying
                    - September Semester
                  </option>
                  <option value="#SPLUS1B4487">
                    D3K7-CPM - MSc Construction Project Management - September
                    Semester
                  </option>
                  <option value="#SPLUSAE12C9">
                    D3T7-FAM - MSc Facilities Management - September Semester
                  </option>
                  <option value="#SPLUSD4CC57">
                    D461-REF - MA Real Estate Mgmt Finance - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS220555">
                    D461-REF - MA Real Estate Mgmt Finance - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUSEB65BA">
                    D461-REF - MA Real Estate Mgmt Finance - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS22B3E9">
                    D4D1-RES - MSc Real Estate - September Semester
                  </option>
                  <option value="#SPLUS1B4493">
                    D4D7-RED - MSc Real Estate Management and Development -
                    September Semester
                  </option>
                  <option value="#SPLUS19B3EF">
                    D4K7-REI - MSc Real Estate Investment and Finance -
                    September Semester
                  </option>
                  <option value="D600- ARC">
                    D600-ARC - BA in Architecture - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSF5B1D7">
                    D600-ARC - BA in Architecture - Year 2 - September Semester
                  </option>
                  <option value="#SPLUSA267E4">
                    D600-ARC - BA in Architecture - Year 3 - September Semester
                  </option>
                  <option value="#SPLUSF70DB0">
                    D600-ARC - BA in Architecture - Year 4 - September Semester
                  </option>
                  <option value="#SPLUS151ECA">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Advanced Engineering Group 1]
                  </option>
                  <option value="#SPLUS09C271">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Engineering Group 1]
                  </option>
                  <option value="#SPLUS09C272">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Engineering Group 2]
                  </option>
                  <option value="#SPLUS09C273">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Engineering Group 3]
                  </option>
                  <option value="#SPLUS22055B">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Engineering Group 4]
                  </option>
                  <option value="#SPLUS1EA1AF">
                    Degree Entry programme - B80C-DEP-1 - September Semester -
                    [Engineering Group 5]
                  </option>
                  <option value="#SPLUS09C2B7">
                    Degree Entry programme - C10C-DEP-1 - September Semester -
                    [Advanced Management Group 1]
                  </option>
                  <option value="#SPLUS22055A">
                    Degree Entry programme - C10C-DEP-1 - September Semester -
                    [Advanced Management Group 2]
                  </option>
                  <option value="#SPLUS12D376">
                    Degree Entry programme - C10C-DEP-1 - September Semester -
                    [Advanced Management Group 3]
                  </option>
                  <option value="#SPLUS09C2B4">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 1]
                  </option>
                  <option value="#SPLUS09C2B5">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 2]
                  </option>
                  <option value="#SPLUS09C2B6">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 3]
                  </option>
                  <option value="#SPLUS220559">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 4]
                  </option>
                  <option value="#SPLUS1EA1DB">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 5]
                  </option>
                  <option value="#SPLUS2D00B6">
                    Degree Entry programme - C10D-DEP-1 - September Semester -
                    [Management Group 6]
                  </option>
                  <option value="#SPLUS09C2B3">
                    Degree Entry programme - E10D-DEP-1 - September Semester -
                    [Design Studies Group 1]
                  </option>
                  <option value="#SPLUS47CF71">
                    Degree Entry programme - E10D-DEP-1 - September Semester -
                    [Design Studies Group 2]
                  </option>
                  <option value="#SPLUS14D748">
                    Degree Entry programme - E10D-DEP-1 - September Semester -
                    [Design Studies Group 3]
                  </option>
                  <option value="E1123-1">
                    E123-IDN - BA in Interior Design - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS35686F">
                    E123-IDN - BA in Interior Design - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS3F087B">
                    E123-IDN - BA in Interior Design - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUSA1CF46">
                    E123-IDN - BA in Interior Design - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS3DC65E">
                    E1A7-IAD - MA Interior Architecture &amp; Design - September
                    Semester
                  </option>
                  <option value="#SPLUSEE1F15">
                    E1B1-FBP - BA Fash Branding and Promotion - Year 1 -
                    September Semester
                  </option>
                  <option value="#SPLUSC6E76B">
                    E1B1-FBP - BA Fash Branding and Promotion - Year 2 -
                    September Semester
                  </option>
                  <option value="#SPLUS494964">
                    E1B1-FBP - BA Fash Branding and Promotion - Year 3 -
                    September Semester
                  </option>
                  <option value="#SPLUSEE1F16">
                    E1C2-COM - BA in Communication Design - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUSC6E76A">
                    E1C2-COM - BA in Communication Design - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS494966">
                    E1C2-COM - BA in Communication Design - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS3EEDB8">
                    E1D7-DMT - Master of Science in Design Management -
                    September Semester
                  </option>
                  <option value="#SPLUS3568A4">
                    E1F5-FMR - BA Fashion Mkting &amp; Retailing - Year 4 -
                    September Semester
                  </option>
                  <option value="#SPLUS1AEAE7">
                    F291-COS - BSc Computer Science - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUS3FF4E6">
                    F291-COS - BSc Computer Science - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS723C7B">
                    F291-COS - BSc Computer Science - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUSB2BD7F">
                    F291-COS - BSc Computer Science - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS3D91DD">
                    F2B1-BIM - MSc in Bus Information Mgt - September Semester
                  </option>
                  <option value="#SPLUS028161">
                    F2CC-CSE - BSc Computer Systems - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUSB47EAF">
                    F2CC-CSE - BSc Computer Systems - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUS8D9825">
                    F2CC-CSE - BSc Computer Systems - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS5A8F57">
                    F2CC-CSE - BSc Computer Systems - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS492C68">
                    F2CG-ITB - MSc IT (Business) - September Semester
                  </option>
                  <option value="#SPLUS3FF4E9">
                    F2D1-DSC - MSc Data Science - September Semester
                  </option>
                  <option value="#SPLUS492C6A">
                    F2EG-ITS - MSc IT (Software Systems) - September Semester
                  </option>
                  <option value="#SPLUSD27410">
                    F2N3-CNS - MSc Network Security - September Semester
                  </option>
                  <option value="F2S7-1">
                    F2S7-SOE - MSc Software Engineering - September Semester
                  </option>
                  <option value="#SPLUS3D91D0">
                    F2Z7-ARI - MSc in Artificial Intelligence - September
                    Semester
                  </option>
                  <option value="#SPLUSFEE497">
                    F740-SDS - BSc Statistical Data Science - Year 1 - September
                    Semester
                  </option>
                  <option value="#SPLUSE274B0">
                    F740-SDS - BSc Statistical Data Science - Year 2 - September
                    Semester
                  </option>
                  <option value="#SPLUSCD3414">
                    F740-SDS - BSc Statistical Data Science - Year 3 - September
                    Semester
                  </option>
                  <option value="#SPLUS55E8DB">
                    F740-SDS - BSc Statistical Data Science - Year 4 - September
                    Semester
                  </option>
                  <option value="#SPLUS93C0C1">
                    F902-MDS - BSc Data Sciences - Year 1 - September Semester
                  </option>
                  <option value="#SPLUSE274B2">
                    F902-MDS - BSc Data Sciences - Year 2 - September Semester
                  </option>
                  <option value="#SPLUS55E9C2">
                    F902-MDS - BSc Data Sciences - Year 3 - September Semester
                  </option>
                  <option value="#SPLUSBE896D">
                    G137-PEE - MSc Petroleum Engineering - September Semester
                  </option>
                  <option value="#SPLUSFEFF1E">
                    MBA (EBS) September Semester
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'semester'}>Semester:</label>
              </td>
              <td>
                <select id={'semester'} name="semester">
                  <option selected="selected" value="September Semester">
                    September Semester
                  </option>
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
                <select id={'start-week'} name={'start-week'}></select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'end-week'}>To week:</label>
              </td>
              <td>
                <select id={'start-week'}></select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={'alert'}>Default alert</label>
              </td>
              <td>
                <select id={'alert'} name="alert"></select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
