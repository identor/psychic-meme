'use strict';

import { default as pad } from 'pad';

const HAPPY = 'happy';
const SAD = 'sad';
const NORMAL = 'normal';

const IMAGE_DATA_SET =  Array.apply(null, Array(1980)).map((val, i) => {
  let paddedIndex = pad(4, (i + ''), '0');
  return {
    index: paddedIndex,
    name: 'Image Data ' + paddedIndex,
    img: './assets/images/data-set-' + paddedIndex + '.jpg'
  }
});

const EMOTION_OUTPUTS = [HAPPY, SAD, NORMAL];


export class MainController {
  constructor ($state, $mdDialog, $document, $log, Firebase, $firebaseArray, $pmTraining) {
    'ngInject';

    this.ref = new Firebase('https://psychic-meme.firebaseio.com');
    this.trainingData = $firebaseArray(this.ref.child('trainingData'));

    this.emotionOutputs = EMOTION_OUTPUTS;
    this.imageDataSet = IMAGE_DATA_SET;

    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.$log = $log;
    this.$pmTraining = $pmTraining;
    $pmTraining.train();
  }

  createTrainingData(ev) {
    const $mdDialog = this.$mdDialog;
    const $document = this.$document;
    const $log = this.$log;

    $mdDialog.show({
      controller: DialogController,
      controllerAs: 'vm',
      templateUrl: 'app/training/create-training-data-dialog.html',
      parent: $document.body,
      targetEvent: ev,
      clickOutsideToClose: true
    }).then((obj) => {
      let data = {
        index: obj.imgIndex,
        img: './assets/images/data-set-' + obj.imgIndex + '.jpg',
        emotion: obj.emotion
      };

      this.trainingData.$add(data).then(savedData => {
        $log.debug(savedData);
      });
    }, error => {
      $log.debug(error);
    });
  }
}

class DialogController {
  constructor($mdDialog) {
    'ngInject';

    this.emotionOutputs = EMOTION_OUTPUTS;
    this.imageDataSet = IMAGE_DATA_SET;

    this.obj = {};
    this.$mdDialog = $mdDialog;
  }

  cancel() {
    const $mdDialog = this.$mdDialog;

    $mdDialog.cancel();
  }

  submit() {
    const $mdDialog = this.$mdDialog;

    $mdDialog.hide(this.obj);
  }
}
