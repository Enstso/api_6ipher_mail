/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import AuthController from '#controllers/auth_controller';
import MailController from '#controllers/mail_controller';
import SocialController from '#controllers/social_controller';
import router from '@adonisjs/core/services/router'


router.group(()=>{
    
    
}).prefix('/api')


router.group(()=>{
    router.post('/register',[AuthController,'register']);
    router.post('/login',[AuthController,'login']);
    router.get('/discord', [SocialController, 'discordRedirect'])
    router.get('/discord/callback', [SocialController, 'discordCallback'])
    router.get('/github', [SocialController, 'githubRedirect'])
    router.get('/github/callback', [SocialController, 'githubCallback'])
    router.get('/google', [SocialController, 'googleRedirect'])
    router.get('/google/callback', [SocialController, 'googleCallback'])
    router.post('/logout',[AuthController,'logout']);
}).prefix('/api/auth')


router.group(()=>{
    router.get('/authorization/callback',[MailController,'authorizationCallback'])
    router.get('/authorization',[MailController,'getAuthorizationCode'])
    router.get('/mails/',[MailController,'getMails'])
}).prefix('/api/gmail/6iphermail')
