<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SleepSync - Sleep Schedule Optimizer App

This is a React Native app that helps users determine the optimal time to go to sleep based on a desired wake-up time, personalized sleep duration, and a wind-down buffer.

## Project Structure

- **src/components/**: UI components used in the app
- **src/utils/**: Utility functions including sleep calculations and storage
- **src/styles/**: Theme and styling
- **src/types/**: TypeScript type definitions
- **src/hooks/**: Custom React hooks

## Core Features

1. Wake-up time selection with time picker
2. Sleep duration customization (6-10 hours) via slider
3. Wind-down period options (15/30/45/60 min)
4. Displays calculated bedtime and wind-down start time
5. Persists user preferences using AsyncStorage

## Coding Guidelines

- Use TypeScript for all new components and functions
- Follow React best practices with functional components and hooks
- Consider accessibility in UI components
- Keep theme consistency using the theme styles
- Write clean, well-documented code
