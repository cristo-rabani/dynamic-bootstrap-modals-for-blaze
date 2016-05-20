# Dynamic Bootstrap Modals for Blaze
This package creates modals on the fly

## Installation

```sh
    $ meteor add cristo:dynamic-bootstrap-modals-for-blaze
```
## Usage

1. Prepare template of modal

```html
<template name="myModal">
<div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>
```

2. Launch modal:

```js
import dynamicModal from 'meteor/cristo:dynamic-bootstrap-modals-for-blaze';

dynamicModal(Template.myModal, {title: 'My Awesome Modal'}, tmpl => console.log('shown!', tmpl));
```

You can also attach events to your template

ex:

```
Template.myModal.events({
   'hide.bs.modal': function () {
       console.log('hidding...');
   }
})
```

### API
####`dynamicModal(template, context, callbacks)`

- template - string or instance of Blaze.Template
- context - object with properties for template
- callbacks - callback or array of callback (if function then is treated as a shown callback).
If object then functions in keys `show, shown, hide, hiden` will be fired in proper moment.
Each of callback has instance of template in first parameter.

#### methods on template instance

- modal - same as $().modal
eg `template.modal('hide')`
- hide - provides to `template.hide()`

### LICENSE MIT
