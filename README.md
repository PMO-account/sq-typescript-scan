
new change 
# TypeScript Code Smells

A demo repository that showcases various common (and serious) TypeScript/JavaScript code smells and misconfigurations.

## 🔒 Issues Demonstrated

### General
- Using `==` instead of `===`
- Lexicographic sorting of numbers
- Useless `await` on async return
- Use of `continue` in loops

### Express + Passport
- No `req.session.regenerate()` after login

### AWS CDK (Cloud Development Kit)
- Overly broad SSH access (`anyIpv4()` for port 22)
- Ingress rules that expose port ranges (1-1024) to all IPs

### XML External Entity (XXE)
- `libxmljs.parseXmlString()` with `noent: true`

## 💻 Usage

```bash
npm install
npm run build
npm start
