const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">xBRS</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
            BRS is the first innovation-based school blending technology, creativity, and storytelling 
            to prepare kids for the future. We believe learning should be an adventure where young minds 
            explore, create, and innovate through hands-on experiences with cutting-edge technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;