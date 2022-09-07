const LOAD_BUTTON = document.getElementById('loadData');
const TRAIN_BUTTON = document.getElementById('trainModel');
const STATUS = document.getElementById('status');
const SUBSTATUS = document.getElementById('subStatus');


LOAD_BUTTON.addEventListener('click', loadData);
TRAIN_BUTTON.addEventListener('click', trainModel)

let CLASS_NAMES = []

const options = {numLabels: 10}
const mobilenet = ml5.featureExtractor("MobileNet", options, modelLoaded)
const classifier = mobilenet.classification()

function modelLoaded() {
    console.log("Model Loaded!")
    STATUS.innerText = 'STATUS: Loaded MobileNet Model! Name Categories And Upload Files Below...'

}


// Run function when window loads
window.onload = function() {
    // add event listener, load unorganized file thumbnails to browser
    var unorganizedFiles = document.getElementById('files-unorganized');
    unorganizedFiles.addEventListener("change", function(event) {
        var files = event.target.files; //FileList object
        var output = document.getElementById("result-unorganized");
        while (output.firstChild) {
            output.removeChild(output.firstChild)
        }
        for(let i = 0; i< files.length; i++) {
            var file = files[i];                
            //Only pics
            if(!file.type.match('image'))
                continue;
            var picReader = new FileReader();
            picReader.addEventListener("load",function(event){
                var picFile = event.target;
                var div = document.createElement("div");
                div.innerHTML = "<img class='unorgThumbnail' src='" + picFile.result + "'" + 
                "'/><p id='unorgFile"+i+"'>";
                output.insertBefore(div,null);            
                }
            );
                //Read the image
            picReader.readAsDataURL(file);
        }
    })
}

function getCategoryNames() {
    SUBSTATUS.innerText = 'Loading Category Names...'
    CLASS_NAMES = []
    var catNames = document.querySelectorAll('.categoryName')
    for (let k=0; k<catNames.length; k++) {
        CLASS_NAMES.push(catNames[k].value)
    }
    console.log(CLASS_NAMES)
    SUBSTATUS.innerText = 'Category Names Loaded...'
}

function loadImages() {
    SUBSTATUS.innerText = 'Loading Images To Model...'
    for (let h=0; h<CLASS_NAMES.length; h++){
        var img_array = document.getElementById('result'+h).getElementsByTagName('img')
        console.log(img_array)
        for (let i=0; i < img_array.length; i++) {
            var imgObj = img_array[i]
            // var categoryId = img_array[i].id
            var categoryId = h
            // categoryId = Number(categoryId.slice(-1))
            console.log(categoryId)
            classifier.addImage(imgObj, CLASS_NAMES[categoryId])
            // console.log(imgObj)
        }
    }
    console.log("Images loaded!")
    SUBSTATUS.innerText = 'Images Loaded...'
}


function loadData() {
    STATUS.innerText = 'STATUS: Loading Data...'
    getCategoryNames()
    loadImages()
    STATUS.innerText = 'STATUS: Data Loaded! Run Model...'
    // SUBSTATUS.innerText = ''
}

function trainModel() {
    console.log('Training!')
    STATUS.innerText = 'STATUS: Model Is Training, Please Wait...'
    classifier.train(whileTraining)
}

function whileTraining(loss) {
    if (loss == null) {
        console.log("Training Complete")
        STATUS.innerText = 'STATUS: Training Complete! Running Predictions...'
        gotResults()
    } else {
        console.log(loss)
    }
}

function gotResults(error, result) {
    var toPredict = document.getElementsByClassName('unorgThumbnail')
    for (let j=0; j<toPredict.length; j++) {
        if (error) {
            console.error(error)
        } else {
            classifier.classify(toPredict[j], CLASS_NAMES.length)
            .then((result) => {
                console.log(result);
               // do whatever you want to do with result
               var label = result[0].label
               var accuracy = result[0].confidence
               console.log("Predicted Classification Label: " + label)
               console.log("Predicted Confidence: " + (accuracy*100).toFixed(2) + "%")
               var predictElement = document.getElementById('unorgFile'+j)
               predictElement.innerText = ('Label: ' + label + ', Confidence: ' + (accuracy*100).toFixed(2) + "%")
           }).catch(err=>console.log(err))
        }
    } 
    STATUS.innerText = 'STATUS: Predictions Complete!'
}
