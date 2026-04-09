const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');

const patches = [
  {
    name: 'ghostty-web font metrics',
    patchFile: path.join(rootDir, 'patches', 'ghostty-web-font-metrics.patch'),
    targetFile: path.join(
      rootDir,
      'node_modules',
      '.pnpm',
      'ghostty-web@0.4.0',
      'node_modules',
      'ghostty-web',
      'dist',
      'ghostty-web.js'
    ),
    appliedMarker: '["M", "█", "", "", "🎯"]',
  },
];

for (const patch of patches) {
  if (!fs.existsSync(patch.targetFile)) {
    console.warn(`Skipping ${patch.name}: target file not found`);
    continue;
  }

  const currentContents = fs.readFileSync(patch.targetFile, 'utf8');
  if (currentContents.includes(patch.appliedMarker)) {
    console.log(`Dependency patch already applied: ${patch.name}`);
    continue;
  }

  if (!fs.existsSync(patch.patchFile)) {
    throw new Error(`Missing patch file: ${patch.patchFile}`);
  }

  console.log(`Applying dependency patch: ${patch.name}`);
  execSync(`patch -N -p1 < "${patch.patchFile}"`, {
    cwd: rootDir,
    stdio: 'inherit',
  });
}
