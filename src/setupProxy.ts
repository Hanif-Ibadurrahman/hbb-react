import { createProxyMiddleware } from "http-proxy-middleware";
import { Application } from "express";

export default function setupProxy(app: Application) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: process.env.PUBLIC_URL,
			changeOrigin: true,
		}),
	);
}
