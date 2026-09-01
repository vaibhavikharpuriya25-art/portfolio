from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER

def create_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(name='TitleStyle', parent=styles['Heading1'], alignment=TA_CENTER, fontSize=24, spaceAfter=12)
    subtitle_style = ParagraphStyle(name='SubtitleStyle', parent=styles['Normal'], alignment=TA_CENTER, fontSize=12, textColor='gray')
    heading_style = ParagraphStyle(name='HeadingStyle', parent=styles['Heading2'], fontSize=16, spaceBefore=12, spaceAfter=6, textColor='darkblue')
    normal_style = styles['Normal']
    
    story = []
    
    # Header
    story.append(Paragraph("VAIBHAVI KHARPURIYA", title_style))
    story.append(Spacer(1, 4))
    
    # Contact Info
    contact_info = """
    <b>Email:</b> vaibhavikharpuriya@gmail.com | <b>Phone:</b> +91 9373289372<br/>
    <b>LinkedIn:</b> www.linkedin.com/in/vaibhavi-k-035a63219<br/>
    <b>Portfolio:</b> vaibhavikharpuriya25-art.github.io/portfolio/
    """
    story.append(Paragraph(contact_info, normal_style))
    story.append(Spacer(1, 12))
    
    # Summary
    story.append(Paragraph("Summary", heading_style))
    story.append(Paragraph("Code lover, problem solver, and creative thinker driven by the endless possibilities of programming.", normal_style))
    story.append(Spacer(1, 12))
    
    # Experience
    story.append(Paragraph("Experience", heading_style))
    
    story.append(Paragraph("<b>Tata Consultancy Services</b>", normal_style))
    story.append(Paragraph("<i>System Engineer | June 2025 - Present (1 year 1 month)</i>", normal_style))
    story.append(Paragraph("Mumbai, Maharashtra, India", normal_style))
    story.append(Spacer(1, 8))
    
    story.append(Paragraph("<b>HaleForm Technology Solutions</b>", normal_style))
    story.append(Paragraph("<i>C# Developer | March 2024 - August 2024 (6 months)</i>", normal_style))
    story.append(Paragraph("Noida, Uttar Pradesh, India", normal_style))
    story.append(Paragraph("Worked on ASP.NET, Microsoft SQL Server, Microsoft Authentication, HTML, CSS", normal_style))
    story.append(Spacer(1, 12))
    
    # Education
    story.append(Paragraph("Education", heading_style))
    story.append(Paragraph("<b>PSIT Kanpur (Pranveer Singh Institute of Technology)</b>", normal_style))
    story.append(Paragraph("Bachelor of Technology - BTech, Computer Science (December 2020 - May 2024)", normal_style))
    story.append(Spacer(1, 12))
    
    # Skills & Certifications
    story.append(Paragraph("Skills & Certifications", heading_style))
    story.append(Paragraph("<b>Top Skills:</b> Microsoft SQL Server, ASP.NET, Git", normal_style))
    story.append(Paragraph("<b>Certifications:</b> Fundamentals of Machine Learning, Decision Trees Using Python, Machine Learning, SQL, Problem Solving, Python", normal_style))
    
    doc.build(story)

create_pdf('/Users/eshan/Portfolio-Website/public/Eshan_Shukla_Resume.pdf')
print("Resume generated successfully.")
