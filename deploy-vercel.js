#!/usr/bin/env node

/**
 * Vercel Deployment Helper Script
 * 
 * This script helps prepare and deploy your TrekAdvisor app to Vercel.
 * It performs pre-deployment checks and provides guidance.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🏔️  TrekAdvisor Vercel Deployment Helper 🏔️\n');

// Check if vercel CLI is installed
try {
  console.log('Checking for Vercel CLI...');
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI is not installed. Installing it is recommended:');
  console.log('   npm i -g vercel');
  console.log('   After installing, run "vercel login" to authenticate\n');
}

// Check if next.config.mjs is properly configured
try {
  console.log('\nChecking Next.js configuration...');
  const configPath = path.join(process.cwd(), 'next.config.mjs');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('output: \'export\'')) {
    console.log('⚠️  WARNING: Your next.config.mjs contains "output: \'export\'" which is used for static exports.');
    console.log('   This might not be needed for Vercel deployment as Vercel supports Next.js server components.');
    console.log('   Consider removing this if you want to use server-side features.\n');
  } else {
    console.log('✅ Next.js configuration looks good for Vercel deployment');
  }
} catch (error) {
  console.log('❓ Could not check Next.js configuration');
}

// Provide deployment instructions
console.log('\n📋 Deployment Steps:');
console.log('1. Make sure your code is committed to a Git repository');
console.log('2. Run "vercel" in this directory OR');
console.log('3. Connect your repository through the Vercel dashboard');
console.log('\n🔗 Vercel Dashboard: https://vercel.com/dashboard');
console.log('📚 Docs: https://vercel.com/docs/frameworks/nextjs\n');

console.log('🚀 Ready for deployment! Good luck!\n'); 