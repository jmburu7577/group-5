'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { openApiSpec } from '@/lib/openapi';

export default function ApiDocsPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">API Documentation</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl">
                        This documentation is generated from the OpenAPI specification for the Handcrafted Haven API.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <SwaggerUI spec={openApiSpec} />
                </div>
            </div>
        </main>
    );
}
