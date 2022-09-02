import YAML from 'yaml';
import { readFileSync } from 'fs';

const getConfigData = () => {
	const yam = readFileSync('./src/rps.yml', 'utf8');
	return YAML.parse(yam);
};

export { getConfigData };
