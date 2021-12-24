import * as scraper from '@lawbrador/shared/src/scraper';
import { applyConfig } from '@lawbrador/shared/src/rule_applyer';
import { getCollection } from './utils';
import { getSourceConfigById } from './source_configs';
import { hashObject, extractUrlVariables } from '@lawbrador/shared/src/url';
import { v4 } from 'uuid';
export const scrapeRoutes = async (fastify) => {
    const scrapeEventCollection = getCollection(fastify, 'scrape_event');
    const documentCollection = getCollection(fastify, 'documents');
    fastify.post('/api/scrape', async (req) => {
        const url = req.body.url;
        const config = getSourceConfigById(req.body.sourceConfigId);
        const urlVariables = extractUrlVariables(url, config.documentUrlConfig);
        const documentHash = hashObject(urlVariables);
        const existingDocument = await documentCollection.findOne({
            hash: documentHash,
        });
        if (existingDocument) {
            return existingDocument.id;
        }
        else {
            const result = await scraper.scrape(url);
            const newScrape = {
                id: v4(),
                sourceConfigId: '1',
                hash: documentHash,
                type: 'scrape',
                timestamp: new Date().getTime(),
                bodyNode: result,
                url: url,
            };
            scrapeEventCollection.insertOne(newScrape);
            const document = {
                id: v4(),
                scrapeId: newScrape.id,
                hash: documentHash,
                url: url,
                timestamp: new Date().getTime(),
                nodes: applyConfig(newScrape.bodyNode, config),
            };
            await documentCollection.insertOne(document);
            return { id: document.id };
        }
    });
    fastify.get('/api/scrape/:id', async (req) => {
        return await documentCollection.findOne({
            id: req.params.id,
        });
    });
};
//# sourceMappingURL=scrape.js.map