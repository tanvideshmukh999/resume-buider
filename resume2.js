let logout = document.getElementById('logout');
let greet = document.getElementById('nav-mssg');
greet.innerHTML = `<p><span>Welcome,</span> ${localStorage.getItem('username')}</p>`;
logout.addEventListener('click', () => {
    localStorage.removeItem('state');
    window.location.href = 'index.html';
});

let darkmode = document.getElementsByClassName('dark-mode')[0];
let darkbtn = document.getElementById('dark-btn');

if(JSON.parse(localStorage.getItem('darkMode')) == true) {
    darkbtn.classList.add('forward');
    document.body.classList.add('dark-effect');
}
let toggle = false;
darkmode.addEventListener('click', ()=>{
    if(!toggle) {
        darkbtn.classList.add('forward');
        darkbtn.classList.remove('backward')
        document.body.classList.add('dark-effect');
        toggle = true;
        localStorage.setItem('darkMode',true);
    }
    else {
        darkbtn.classList.add('backward');
        document.body.classList.remove('dark-effect');
        toggle = false;
        localStorage.setItem('darkMode',false);
    }
});

let achievebtn = document.getElementById('achieve-btn');
let achievetitle = document.getElementsByClassName('achieve-title')[0]; 
let achievedesc = document.getElementsByClassName('achieve-desc')[0]
let achievewrap = document.getElementsByClassName('achievement-wrap')[0];
function updateAchievement(e,achTit=null,achDesc=null) {
    let div = document.createElement('div');
    div.classList.add('achievement');
    let title = achievetitle.value;
    let desc = achievedesc.value;
    if(e.key == 'Enter' && achTit == null && achDesc == null) {
        div.innerHTML = `
            <h4>${title}</h4>
            <p>${desc}</p>
            `;
        achievewrap.appendChild(div);    
    }

    if(e.key == 'Enter' && (achTit || achDesc)) {
        div.innerHTML = `
            <h4>${achTit.value}</h4>
            <p>${achDesc.value}</p>
            `;
        achievewrap.appendChild(div);  
    }
    return div;
}
achievetitle.addEventListener('keyup',(e) => updateAchievement(e))
achievedesc.addEventListener('keyup',(e)=>  updateAchievement(e))
achievebtn.addEventListener('click', () => {
    let row = document.createElement('div');
    row.classList.add('achievements-wrap','height');
    row.style.transition = 'height 1s ease';
    let achieveQuery = window.matchMedia("(max-width: 687px)");
        if(achieveQuery.matches) {
            row.style.height = '205px';
        }
        else {
            row.style.height = '110px';
        }
    // achieveQuery.addListener(handleScreenChange);
    let achievementDisp = document.getElementsByClassName('add-achievements')[0];
    row.innerHTML = `
        <div class="title">
            <p>Title</p>
            <input type="text" placeholder="e.g.title" class="achieve-title">
        </div>
        <div class="description">
            <p>Description</p>
            <input type="text" placeholder="e.g.desc." class="achieve-desc">
        </div>    
        <div class="close-achieve close">
            <button class="closeachieve">-</button>
        </div>
        `
    achievementDisp.appendChild(row);
    let title = row.querySelector('.achieve-title');
    let desc = row.querySelector('.achieve-desc');
    title.addEventListener('keyup', (e)=>{ updateAchievement(e,title,desc)});
    desc.addEventListener('keyup', (e)=>{updateAchievement(e,title,desc)});    

    row.querySelector('.closeachieve').addEventListener('click',(e)=>{
        let achieveRow = e.target.parentElement.parentElement;
        let correspondingDiv = achievewrap.querySelector('.achievement:last-child');
        achieveRow.style.height = '0px';
        setTimeout(() => {
            achieveRow.remove();
            if (correspondingDiv) {
                correspondingDiv.remove();
            }
        }, 1000);
    });   
})

let expbtn = document.getElementById('experience-btn');
let exptitle = document.getElementsByClassName('exp-title')[0];
let expcomp = document.getElementsByClassName('exp-company')[0];
let explocation = document.getElementsByClassName('exp-location')[0];
let expstart = document.getElementsByClassName('exp-startdate')[0];
let expend = document.getElementsByClassName('exp-enddate')[0];
let expdesc = document.getElementsByClassName('exp-desc')[0];
let expeDisp = document.getElementsByClassName('exp-wrap')[0];

function updateExperience(e,expTitle=null,expComp=null,expLoc=null,expStart=null,expEnd=null,expDesc=null) {
    let div = document.createElement('div');
    div.classList.add('user-exp');
    let title = exptitle.value;
    let company = expcomp.value;
    let location = explocation.value;
    let startdate = expstart.value;
    let enddate = expend.value;
    let desc = expdesc.value;
    if(e.key == 'Enter' && expTitle == null && expComp==null && expLoc==null && expStart==null && expEnd==null && expDesc==null) {
        div.innerHTML = `
       <div class="inner-exp">
            <h4>${company}</h4>
            <p class="jobtitle">${title}</p>
            <p>${location}</p>
            <p class="jobdesc">${desc}</p>
        </div>    
        <p>${startdate} - ${enddate}</p>
        `;
        expeDisp.appendChild(div);
    }
    if(e.key == 'Enter' && (expTitle || expComp || expLoc || expStart || expEnd || expDesc)) {
        div.innerHTML = `
        <div class="inner-exp">
            <h4>${expComp.value}</h4>
            <p class="jobtitle">${expTitle.value}</p>
            <p>${expLoc.value}</p>
            <p class="jobdesc">${expDesc.value}</p>
        </div>    
        <p>${expStart.value} - ${expEnd.value}</p>
        `;
        expeDisp.appendChild(div);
    }
}

exptitle.addEventListener('keyup', (e)=> updateExperience(e));
expcomp.addEventListener('keyup', (e)=> updateExperience(e));
explocation.addEventListener('keyup', (e)=> updateExperience(e));
expstart.addEventListener('keyup', (e)=> updateExperience(e));
expend.addEventListener('keyup', (e)=> updateExperience(e));
expdesc.addEventListener('keyup', (e)=> updateExperience(e));

expbtn.addEventListener('click',()=>{
    let row = document.createElement('div');
    let mediumQuery = window.matchMedia("(max-width: 975px)");
    let smallQuery = window.matchMedia("(width<=655px)");
    let handleQuery = () => {
        if(mediumQuery.matches) {
            row.style.height = '550px';
        }

        else {
            row.style.height = '210px';
        }
    }
    handleQuery();
    row.classList.add('experience-wrap','expheight');
    row.style.transition = 'height 1s ease';
    let expDisp = document.getElementsByClassName('add-experience')[0];
    row.innerHTML = `
        <div class="row">    
            <div class="title">
                <p>Title</p>
                <input type="text" placeholder="e.g. company" class="exp-title">
            </div>
            <div class="company">
                <p>Company</p>
                <input type="text" placeholder="e.g. position" class="exp-company">
            </div>
            <div class="location">
                <p>Location</p>
                <input type="text" placeholder="e.g. duration" class="exp-location">
            </div>
            <div class="close-exp close">
                <button class="close-exp">-</button>
            </div>
        </div>   
        <div class="row">
            <div class="Start-date">
                <p>Start Date</p>
                <input type="date" class="exp-startdate">
            </div>
            <div class="end-date">
                <p>End Date (optional)</p>
                <input type="date" class="exp-enddate">
            </div>
            <div class="description">
                <p>Description</p>
                <input type="text" placeholder="e.g. desc" class="exp-desc">
            </div>
        </div> 
        `
    expDisp.appendChild(row);
    let expTitle = row.querySelector('.exp-title');
    let expComp = row.querySelector('.exp-company');
    let expLocation = row.querySelector('.exp-location');
    let expStart = row.querySelector('.exp-startdate');
    let expEnd = row.querySelector('.exp-enddate');
    let expDesc = row.querySelector('.exp-desc');

    expTitle.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));
    expComp.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));
    expLocation.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));
    expStart.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));
    expEnd.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));
    expDesc.addEventListener('keyup', (e)=> updateExperience(e,expTitle,expComp,expLocation,expStart,expEnd,expDesc));

    row.querySelector('.close-exp').addEventListener('click', (e)=> {
        let expRow = e.target.parentElement.parentElement.parentElement;
        expRow.style.height = '0px';
        let correspondingDiv = expeDisp.querySelector('.user-exp:last-child');
        if(correspondingDiv) {
            correspondingDiv.remove();
        }
        setTimeout(() => expRow.remove(),1000);
    })
});

let edubtn = document.getElementById('education-btn');
let educationtitle = document.getElementsByClassName('institute')[0];
let edudeg = document.getElementsByClassName('degree')[0];
let educity = document.getElementsByClassName('city')[0];
let edustartdate = document.getElementsByClassName('startdate')[0];
let eduenddate = document.getElementsByClassName('enddate')[0];
let edudescription = document.getElementsByClassName('edu-desc')[0];
let educationDisp = document.getElementsByClassName('education-wrapper')[0];

function updateEducation(e, edutitle=null, degree=null, city=null, startdate=null,enddate=null, edudesc=null) {
    let div = document.createElement('div');
    div.classList.add('education');
    let title = educationtitle.value;
    let deg = edudeg.value;
    let cit = educity.value;
    let start = edustartdate.value;
    let end = eduenddate.value;
    let desc = edudescription.value;

    if(e.key == 'Enter' && edutitle==null && degree==null && city==null && startdate==null && enddate==null && edudesc==null) {
        div.innerHTML = `
            <div class="edu-inner">
                <h4>${title}</h4>
                <p>${deg}, ${cit}</p>
                <p>${desc}</p>
            </div>
            <p class="sten">${start} - ${end? end : 'Present'}</p>
            `;
        educationDisp.appendChild(div);
    }
    if(e.key == 'Enter' && (edutitle || degree || city || startdate || enddate || edudesc)) {
        div.innerHTML = `
            <div class="edu-inner">
                <h4>${edutitle.value}</h4>
                <p>${degree.value}, ${city.value}</p>
                <p>${edudesc.value}</p>
            </div>
            <p class="sten">${startdate.value} - ${enddate.value? enddate.value : 'Present'}</p>
            `;
        educationDisp.appendChild(div);
    }
}

educationtitle.addEventListener('keyup',(e)=> updateEducation(e));
edudeg.addEventListener('keyup',(e)=> updateEducation(e));
educity.addEventListener('keyup',(e)=> updateEducation(e));
edustartdate.addEventListener('keyup',(e)=> updateEducation(e));
eduenddate.addEventListener('keyup',(e)=> updateEducation(e));
edudescription.addEventListener('keyup',(e)=> updateEducation(e));

edubtn.addEventListener('click',()=>{
    let row = document.createElement('div');
    row.classList.add('experience-wrap','expheight');
    let mediumQuery = window.matchMedia("(max-width: 975px)");
    let smallQuery = window.matchMedia("(width<=655px)");
    let handleQuery = () => {
        if(mediumQuery.matches) {
            row.style.height = '550px';
        }

        else {
            row.style.height = '210px';
        }
    }
    handleQuery();
    row.style.transition = 'height 1s ease';
    let eduDisp = document.getElementById('education');
    row.innerHTML = `
                <div class="row">
                    <div class="School">
                        <p>Title</p>
                        <input type="text" placeholder="e.g. school" class="institute">
                    </div>
                    <div class="Degree">
                        <p>Degree</p>
                        <input type="text" placeholder="e.g. degree" class="degree">
                    </div>    
                    <div class="City">
                        <p>City</p>
                        <input type="text" placeholder="e.g. city" class="city">
                    </div>
                    <div class="close-exp close">
                        <button class="closeEdu">-</button>
                    </div>
                </div>
                <div class="row">
                    <div class="Start-date">
                        <p>Start Date</p>
                        <input type="date" class="startdate">
                    </div>
                    <div class="end-date">
                        <p>End Date (optional)</p>
                        <input type="date" class="enddate">
                    </div>
                    <div class="description">
                        <p>Grade</p>
                        <input type="text" placeholder="e.g. desc" class="edu-desc">
                    </div>    
                </div>
            </div>
            `
    eduDisp.appendChild(row);
    let edutitle = row.querySelector('.institute');
    let degree =  row.querySelector('.degree');
    let city =  row.querySelector('.city');
    let startdate =  row.querySelector('.startdate');
    let enddate =  row.querySelector('.enddate');
    let edudesc =  row.querySelector('.edu-desc');

    edutitle.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));
    degree.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));
    city.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));
    startdate.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));
    enddate.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));
    edudesc.addEventListener('keyup',(e)=> updateEducation(e, edutitle, degree, city, startdate,enddate, edudesc));

    row.querySelector('.closeEdu').addEventListener('click',(e)=>{
        let expRow = e.target.parentElement.parentElement.parentElement;
        expRow.style.height = '0px';
        let correspondingDiv = educationDisp.querySelector('.education:last-child');
        if(correspondingDiv) {
            correspondingDiv.remove();
        }
        setTimeout(() => expRow.remove(),1000);
    });
});

let projectbtn = document.getElementById('project-btn');
let projectname = document.getElementsByClassName('projectname')[0];
let projectlink = document.getElementsByClassName('projectlink')[0];
let projectdesc = document.getElementsByClassName('projectdesc')[0];
let projectCont = document.getElementsByClassName('projects-cont')[0];

function updateProject(e, name=null, link=null, desc=null) {
    let div = document.createElement('div');
    div.classList.add('project-work');
    let nameVal = projectname.value;
    let linkVal = projectlink.value;
    let descVal = projectdesc.value;
    if(e.key == 'Enter' && name==null && link==null && desc==null) {
        div.innerHTML = `
            <div class="project-inner">
                <h4 class="proj-title">${nameVal}</h4>
                <a href="${linkVal}" target="_blank">click ${nameVal}</a>
                <p class="proj-desc">${descVal}</p>
            </div>
            `;
        projectCont.appendChild(div);
    }
    if(e.key == 'Enter' && (name || link || desc)) {
        div.innerHTML = `
            <div class="project-inner">
                <h4 class="proj-title">${name.value}</h4>
                <a href="${link.value}" target="_blank">${name.value}</a>
                <p class="proj-desc">${desc.value}</p>
            </div>
            `;
        projectCont.appendChild(div);
    }
}

projectname.addEventListener('keyup',(e)=> updateProject(e));
projectlink.addEventListener('keyup',(e)=> updateProject(e));
projectdesc.addEventListener('keyup',(e)=> updateProject(e));

projectbtn.addEventListener('click',()=>{
    let row = document.createElement('div');
    row.classList.add('projects-wrap','expheight');
    let mediumQuery = window.matchMedia("(max-width: 655px)");
    let handleQuery = () => {
        if(mediumQuery.matches) {
            row.style.height = '255px';
        }

        else {
            row.style.height = '170px';
        }
    }
    handleQuery();
    row.style.transition = 'height 1s ease';
    let projectDisp = document.getElementsByClassName('add-projects')[0];
    row.innerHTML = `
                <div class="name">
                    <p>Project Name</p>
                    <input type="text" placeholder="eg.name" class="projectname">
                </div>
                <div class="link">
                    <p>Project Link</p>
                    <input type="text" placeholder="eg.link" class="projectlink">
                </div>
                <div class="description">
                    <p>Description</p>
                    <input type="text" placeholder="eg.link" class="projectdesc">
                </div>
                <div class="close">
                    <button class="closeProject">-</button>
                </div>
            `
    projectDisp.appendChild(row);
    let projectname = row.querySelector('.projectname');
    let projectlink = row.querySelector('.projectlink');
    let projectdesc = row.querySelector('.projectdesc');

    projectname.addEventListener('keyup',(e)=> updateProject(e, projectname, projectlink, projectdesc));
    projectlink.addEventListener('keyup',(e)=> updateProject(e, projectname, projectlink, projectdesc));
    projectdesc.addEventListener('keyup',(e)=> updateProject(e, projectname, projectlink, projectdesc));

    row.querySelector('.closeProject').addEventListener('click',(e)=> {
        let projectRow = e.target.parentElement.parentElement;
        projectRow.style.height = '0px';
        let correspondingDiv = projectCont.querySelector('.project-work:last-child');
        if (correspondingDiv) {
            correspondingDiv.remove();
        }
        // row.querySelector('.closeProject').style.display = 'none';
        setTimeout(() => projectRow.remove(),1000);
    });
});

let skillArr = [];
let skillsbtn = document.getElementById('skills-btn');
let skillinp = document.getElementsByClassName('skillinp')[0];
skillinp.addEventListener('keyup',(e)=>{
    let skill = skillinp.value;
    if(e.key == "Enter" && skill.trim()!== "") {
            let skilltag = document.createElement('p');
            skilltag.textContent = skill.trim();
            if(!skillArr.includes(skilltag.textContent)){
                skillArr.push(skilltag.textContent);
                document.getElementsByClassName('skill-wrapper')[0].appendChild(skilltag);
                console.log(skillArr)
            }else{
              skillinp.value = "";
              return;
            }
    }
})

skillsbtn.addEventListener('click', (e) =>{
    let row = document.createElement('div');
    row.style.height = '85px';
    let disp = document.getElementsByClassName('skills-wrap')[0];
    row.classList.add('skill-cont','skillheight');
    let skilltag = document.createElement('p');
    row.innerHTML = `
      <div class="skill-wrap">
        <p>Skill</p>
        <input type="text" placeholder="..hit enter to add" class="skillinp" ">
      </div>  
      <div class="close">
        <button class="skillclosebtn">-</button>
      </div>
     `
     disp.appendChild(row);
     let skillInput = row.querySelector('.skillinp');
     skillInput.addEventListener('keyup', (e) => {
        let skill = skillInput.value;
        if(e.key == "Enter" && skill.trim()!== "") {
            skilltag.textContent = skill.trim();
            skillArr.push(skilltag.textContent);
            document.getElementsByClassName('skill-wrapper')[0].appendChild(skilltag);
        } 
     });
     let closebtn = row.querySelector('.skillclosebtn');
     closebtn.addEventListener('click', (e) => {
        let skillRow = e.target.parentElement.parentElement;
        skillRow.style.height = '0px';
        skilltag.remove();
        setTimeout(() => skillRow.remove(),1000);
     });
});

let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let mname = document.getElementById('mname');
let file = document.getElementById('file');
let desig = document.getElementById('desig');
let address = document.getElementById('address');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let summary = document.getElementById('sum');
let namecont = document.getElementsByClassName('name-cont')[0];

let imgcont = document.getElementById('image-cont');
let nameSpan = document.createElement('span');
namecont.appendChild(nameSpan);
function updateFullName() {
    let fullName = fname.value;

    if (mname.value) {
        fullName += ' ' + mname.value;
    }

    if (lname.value) {
        fullName += ' ' + lname.value;
    }

    nameSpan.textContent = fullName;
}

fname.addEventListener('keyup', updateFullName);
mname.addEventListener('keyup', updateFullName);
lname.addEventListener('keyup', updateFullName);

file.addEventListener('change',()=>{
    let fileInput = file.files[0];
    if(fileInput) {
        let reader = new FileReader();
        reader.onload = (e)=>{
            document.getElementById('userimg').src = e.target.result;
            imgcont.style.display = 'block';
        }
        reader.readAsDataURL(fileInput);
    }
});

let desigspan = document.createElement('span');

function updateDesignation() {
    desigspan.textContent = desig.value;
    document.getElementsByClassName('design')[0].appendChild(desigspan);
    document.getElementsByClassName('separator')[0].style.display = 'block';
}
desig.addEventListener('keyup', updateDesignation);

let addtag = document.createElement('p');
addtag.classList.add('user-address');

function addAddress() {
    addtag.textContent = address.value;
    document.getElementsByClassName('about-wrap')[0].appendChild(addtag);
}
address.addEventListener('keyup', addAddress);

let emailtag = document.createElement('p');
emailtag.classList.add('user-email');

function addEmail() {
    emailtag.textContent = email.value;
    document.getElementsByClassName('about-wrap')[0].appendChild(emailtag);
}
email.addEventListener('keyup', addEmail);

let phonetag = document.createElement('p');
phonetag.classList.add('user-phone');
function addPhone() {
    phonetag.textContent = phone.value;
    document.getElementsByClassName('about-wrap')[0].appendChild(phonetag);
}
phone.addEventListener('keyup',addPhone);

let sumtag = document.createElement('p');
function addSummary() {
    sumtag.textContent = summary.value
    document.getElementsByClassName('profile-wrap')[0].appendChild(sumtag);
}
summary.addEventListener('keyup', addSummary);

//   api
//   https://autocomplete.indeed.com/api/v0/suggestions/what?country=IN&language=en&count=10&formatted=1&query=sql
// https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=cfb324a0&app_key=5e580830e95dd410d2ff127c317eb87b
let suggestionBtn = document.getElementById('suggestionbtn');
let loader = document.querySelector('.loader');
let suggestionCont = document.getElementById('suggestions-cont');
let projectSuggestionBtn = document.getElementById('project-suggest-btn');

function checkSkills() {
    return skillArr.length == 0;
}
import { getAndFetch } from './jobSuggestions.js';
suggestionBtn.addEventListener('click', async(e)=>{
    suggestionCont.innerText = '';
    loader.style.display = 'block';
    if(checkSkills()) {
        suggestionCont.innerText = 'Please enter more details for suggestions.';
        loader.style.display = 'none';
        return;
    }
    let data = await getAndFetch(skillArr,e.target.id);
    console.log(JSON.stringify(data));
    
    displayData(data);
});

function displayData(data) {
    loader.style.display = 'none';
    suggestionCont.innerText = data.map(ele => JSON.parse(JSON.stringify(ele)).response.candidates[0].content.parts[0].text.split('#').join("").split('*').join('')).join('\n');
    if(suggestionCont.innerText == '') {
        suggestionCont.innerText = 'Error in fetching the results. Please try again later.'
    }
}

projectSuggestionBtn.addEventListener('click',async(e)=>{
    suggestionCont.innerText = '';
    loader.style.display = 'block';
    if(checkSkills()) {
        suggestionCont.innerText = 'Please enter more details for suggestions.';
        loader.style.display = 'none';
        return;
    }
    let data = await getAndFetch(skillArr,e.target.id);
    console.log(JSON.stringify(data));
    displayData(data);
})