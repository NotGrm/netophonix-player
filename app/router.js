import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('episodes');
  this.route('sagas', function() {
    this.route('show', { path: '/:saga_id'});
  });
});

export default Router;
