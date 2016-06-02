import {Blaze} from 'meteor/blaze';

export default function dynamicModal (template, context = {}, callbacks = {}) {
    const {show, shown = callbacks, hide, hidden} = callbacks || {};
    if (typeof template === 'string') {
        template = Template[template];
    }
    if (!template || !(template instanceof Blaze.Template)) {
        throw new Error('You must pass blaze template');
    }
    template.onRendered(function () {
        Tracker.afterFlush(() => {
            const $modal = $(this.firstNode);
            this.modal = $modal.modal.bind($modal);

            $modal.on('hidden.bs.modal', () => {
                if (typeof hidden === 'function') {
                    hidden(this);
                }
                Blaze.remove(this.view);
            });

            if (typeof hide === 'function') {
                $modal.on('hide.bs.modal', () => hide(this));
            }

            if (typeof shown === 'function') {
                $modal.on('shown.bs.modal', () => shown(this));
            }

            if (typeof show === 'function') {
                $modal.on('show.bs.modal', () => show(this));
            }
            this.hide = () => this.modal('hide');
            this.modal('show');

        });
    });

    return Blaze.renderWithData(template, context, document.body);
}
