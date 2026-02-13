# Contributing to CarPrices.ae Frontend

Thank you for your interest in contributing! This document provides guidelines and instructions.

## 🔧 Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/carprices-new-frontend.git
   cd carprices-new-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📝 Code Standards

### JavaScript/JSX

- Use ES6+ features
- Use `const` and `let`, never `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring when appropriate

### React

- Functional components with hooks
- PropTypes or TypeScript for type checking
- Meaningful component and variable names
- Keep components small and focused
- Avoid inline functions in JSX (use useCallback)
- Use useMemo for expensive computations

### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Functions**: camelCase (`fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **CSS Classes**: kebab-case or Tailwind utilities

### File Structure

```
src/components/
├── ComponentName/
│   ├── index.jsx          # Main component
│   ├── ComponentName.jsx  # Implementation
│   └── styles.module.css  # Styles (if needed)
```

## 🎨 Styling Guidelines

- Use Tailwind CSS utilities first
- Avoid inline styles
- Use consistent spacing (4px grid: 4, 8, 12, 16, 24, 32, 48, 64)
- Mobile-first responsive design
- Use CSS variables from `globals.css` for colors

## 🚫 What NOT to Do

1. **Never commit:**
   - `.env` or `.env.local` files
   - Credentials or API keys
   - `node_modules` or `.next` directories
   - Personal configuration files

2. **Never use:**
   - `console.log` in production code
   - `var` keyword
   - Inline styles (use Tailwind)
   - Anonymous array indices as keys

3. **Avoid:**
   - Large components (> 300 lines)
   - Prop drilling (use Context or Redux)
   - Nested ternary operators
   - Magic numbers (use constants)

## ✅ Code Quality Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] No console.log statements
- [ ] No linting errors (`npm run lint`)
- [ ] Components are properly named
- [ ] Props are documented
- [ ] No hardcoded values
- [ ] Responsive design tested
- [ ] Images are optimized
- [ ] Accessibility considered
- [ ] Error boundaries added where needed

## 🧪 Testing

While tests are currently being set up, please:

- Test your changes manually
- Test on multiple screen sizes
- Test on different browsers
- Verify no console errors

## 📦 Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Follow the style guide
   - Add comments for complex logic

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add user authentication"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Formatting, missing semi-colons, etc.
   - `refactor:` Code restructuring
   - `perf:` Performance improvements
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub and create a PR
   - Fill in the PR template
   - Link related issues
   - Request review

## 🐛 Bug Reports

When reporting bugs, include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information
- Console errors

## 💡 Feature Requests

When proposing features:

- Explain the use case
- Describe expected behavior
- Provide mockups if possible
- Consider impact on existing features

## 📞 Communication

- Be respectful and constructive
- Ask questions if unsure
- Share knowledge
- Help review others' code

## 🔒 Security

- Never commit sensitive data
- Report security issues privately
- Follow security best practices
- Keep dependencies updated

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Material-UI](https://mui.com)

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to CarPrices.ae! 🚗
