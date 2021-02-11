import express, { Router } from 'express';
// Import index action from ads controller
import { index } from './controllers/ads';

// Initialize the router
const router = Router();

// Handle /ads.json route with index action from ads controller
router.route('/ads.json')
  .get(index);

export default router;
