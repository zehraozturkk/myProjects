//course class
class Course{
    constructor(title,insturcture,image){
        this.courseId = Math.floor(Math.random()*10000);
        this.title=title;
        this.insturcture=insturcture;
        this.image=image;
    }
}


//UI class
class UI{
    addCoursetoList(course) {
        const list = document.getElementById('course-list');

        var html = `
        <tr>
            <td><img src="Image/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href = "#" data-id = "${course.courseId}" class = "btn btn-danger btn-sm delete">Delete</a></td>

        </tr>
        
        `;

        list.innerHTML += html;

    }

    clearControls(){
        const title = document.getElementById('title').value='';
        const instructor = document.getElementById('instructor').value='';
        const image = document.getElementById('image').value='';

    }

    deleteCourse(element){
        if (element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }

    }

    showAlert(message, className){
        var alert = `

        <div class="alert alert-${className}">
            ${message}
        </div>
        `;

        const row = document.querySelector('.row');
        //beforebegin, afterBegin, beforeEnd, afterEnd
        row.insertAdjacentHTML('beforeBegin', alert);


        setTimeout(() => {
            document.querySelector('.alert').remove();
        },2000);


    }
}

class Storage{

    static getCourses(){

        let courses;

        if(localStorage.getItem('courses') === null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }

        return courses;

    }

    static displayCourses(){

        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCoursetoList(course)
            
        });

    }

    static addCourse(course){

        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));//json stringine çevirdik

    }

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');

            const courses = Storage.getCourses();//burda kurslarımızı aldık

            courses.forEach((course,index)=>{

                if(course.courseId == id){
                    courses.splice(index,1);
                }
            });

            localStorage.setItem('courses', JSON.stringify(courses));
        }

    }
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);

document.getElementById('new-course').addEventListener('submit',
function(e){

    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;

    //create course object
    const course= new Course(title, instructor, image);


    //Creat UI
    const ui = new UI();


    if(title==='' || instructor ==='' || image===''){
        ui.showAlert('please complete the form', 'warning')
    }else{
        //add course to list
        ui.addCoursetoList(course);

        //save to local storage
        Storage.addCourse(course);
            
        //clear controls 
        ui.clearControls();

        ui.showAlert('the course has been added', 'success');

    }

    e.preventDefault();
})

document.getElementById('course-list').addEventListener('click', function(e){
    const ui = new UI();

    //deletecourse
    ui.deleteCourse(e.target);

    //delete from local storage
    Storage.deleteCourse(e.target);

    ui.showAlert('the course has been deleted', 'danger')
});