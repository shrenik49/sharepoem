FROM node:20-alpine as build

# Set working directory
workdir /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

#copy all files
COPY . .

#Build typescript project to javascript
RUN npm run build


# --------- Runtime image ---------
FROM node:20-alpine

# Set working directory
workdir /app
# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

# Expose the port your app runs on
EXPOSE 4000

# Run the app
CMD ["node", "dist/index.js"]