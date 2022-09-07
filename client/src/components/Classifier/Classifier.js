import React, { useState } from "react";
import './Classifier.css';
import ml5 from 'ml5';
import $ from 'jquery';

const Classifier = () => {
  // const LOAD_BUTTON = document.getElementById('loadData');
  // LOAD_BUTTON.addEventListener('click', loadData);
  // const TRAIN_BUTTON = document.getElementById('trainModel');
  // TRAIN_BUTTON.addEventListener('click', trainModel);
  

  let CLASS_NAMES = []

  const options = {numLabels: 10}
  const mobilenet = ml5.featureExtractor("MobileNet", options, modelLoaded)
  const classifier = mobilenet.classification();

  const [status, setStatus] = useState('STATUS: Loaded MobileNet Model! Name Categories And Upload Files Below...')
  const [subStatus, setSubStatus] = useState('');

  function modelLoaded() {
    return status
  }
  console.log("Model Loaded!")  

  function getCategoryNames() {
    setSubStatus('Loading Category Names...')
    
    CLASS_NAMES = []
    var catNames = document.querySelectorAll('.categoryName')
    for (let k=0; k<catNames.length; k++) {
        CLASS_NAMES.push(catNames[k].value)
    }
    console.log(CLASS_NAMES)
    setSubStatus('Category Names Loaded...')
  }

  function loadImages() {
      setStatus('Loading Images To Model...')
    
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
    setSubStatus('Images Loaded...')
  }

  function loadData() {
    setStatus('STATUS: Loading Data...')
    
    getCategoryNames()
    loadImages()
    setStatus('STATUS: Data Loaded! Run Model...')
    // SUBSTATUS.innerText = ''
  }

  function trainModel() {
    console.log('Training!')  
    setStatus('STATUS: Model Is Training, Please Wait...')
  
    classifier.train(whileTraining)
  }

  function whileTraining(loss) {
    if (loss == null) {
        console.log("Training Complete")
        setStatus('STATUS: Training Complete! Running Predictions...')
        
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
              predictElement(('Label: ' + label + ', Confidence: ' + (accuracy*100).toFixed(2) + "%"))
               
           }).catch(err=>console.log(err))
        }
    } 
    setStatus('STATUS: Predictions Complete!')
    
  }

    $(document).ready(function(){
      var maxField = 9;
      var addButton = $('.add_button');
      var wrapper = $('.field_wrapper');
      var trainData = $('.trainData')
      var x = 1; //Initial field counter is 1

      // Once add button is clicked
      $(addButton).click(function() {
        if(x<maxField){
          x++; //Increment field counter
          $(wrapper).append('<div><input type="text" class="categoryName" name="category_name[]" value="cat'+x+'"/><a href="javascript:void(0);" class="remove_button" title="Delete field"> <img src="images/delete.png" alt=""></a><label for="files"> Select sample images for this category: </label><input id="files'+x+'" class="trainData" type="file" multiple accept="image/jpeg, image/png, image/jpg"/><div class="row" id="result'+x+'"/>'); //Add field html
        }
      })

      // Once remove button is clicked
      $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
      })

      // Event delegation to display thumbnails when files uploaded per category
      document.querySelector('.field_wrapper').addEventListener('change', event => {
        if (event.target.matches('.trainData')) {
          var output = event.target.nextElementSibling
          // console.log(output)
          while (output.firstChild) {
              output.removeChild(output.firstChild)
          }

          var files = event.target.files; //FileList object  
          for(let i = 0; i< files.length; i++) {
              var file = files[i];                
              //Only pics
              if(!file.type.match('image'))
                continue;
              var picReader = new FileReader();
              picReader.onload("load",function(event){
                  var picFile = event.target;
                  var div = document.createElement("div");
                  div.innerHTML = "<img class='trainThumbnail' src='" + picFile.result + "' id='trainFile" + i + 
                  "'/>"
                  output.insertBefore(div,null);            
                  }
              );
                //Read the image
              picReader.readAsDataURL(file);
          }
        }
      })
    });
  
  
  return (
    <div className="container-xl">
      <div>
        <h1>Customize Your Photo Classifier</h1>
      
        <p id="status">STATUS: Awaiting MobileNet Model Load...</p>
        <p id="subStatus"></p>
      </div>
      <div className="row">
        <button id="loadData" onClick={loadData}>Load Data</button>
        <button id="trainModel" onClick={trainModel}>Train & Predict</button>
      </div>

      <div className="categoryContainer">
        <div className="field_wrapper" id="field_wrapper">
          <p>- - -</p>
          <h2>Classifier Categories</h2>
          <p>Name Up To 10 Unqiue Categories Below (At Least Two Required) - Use More Sample Images For Better Accuracy!</p>
          <div>
            <input type="text" className="categoryName" name="category_name[]" defaultValue={'cat0'}/>
            <a className="locked_button" title="Locked field"><img src="../../assets/lock.png" alt=""></img></a>
            <label htmlFor="files">Select sample images for this category: </label>
            <input id="files0" className="trainData" type="file" multiple accept="image/jpeg, image/png, image/jpg"/>
            <div className="row" id="result0"></div>
          </div>
          <div>
            <input type="text" className="categoryName" name="category_name[]" defaultValue={'cat1'}/>
            <a className="add_button" id="add_button" title="Add field"><img src="../../assets/add.png" alt=""></img></a>
            <label htmlFor="files">Select sample images for this category: </label>
            <input id="files1" className="trainData" type="file" multiple accept="image/jpeg, image/png, image/jpg"/>
            <div className="row" id="result1"></div>
          </div>
        </div>
        <div>
          <p>- - -</p>
          <label htmlFor="files">Select all other images you want organized: </label>
          <input id="files-unorganized" className="testData" type="file" multiple/>
          <output id="result-unorganized"></output>
        </div>
      </div>
    </div>
  )
}

export default Classifier;