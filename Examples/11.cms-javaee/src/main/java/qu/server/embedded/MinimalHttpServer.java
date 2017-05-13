package qu.server.embedded;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

/**
 * Embedded http server using jetty.
 */
public class MinimalHttpServer {

	public static void main(String[] args) {
        ResourceConfig config = new ResourceConfig();
        //Host 3 services for Contact Management System and Hifz system
        config.packages("qu.cms.service", "qu.hifz.service");
        ServletHolder jerseyServlet = new ServletHolder(new ServletContainer(config));

        Server server = new Server(9090);
        ServletContextHandler context = new ServletContextHandler(server, "/");
        context.addServlet(jerseyServlet, "/*");
        
        try {
			server.start();
			System.out.println("Listening @ http://localhost:9090/api/contacts");
			System.out.println("Listening @ http://localhost:9090/api/surahs");
			server.join();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}