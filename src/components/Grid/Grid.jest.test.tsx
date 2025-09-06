import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Grid, { Certificate } from "./index"

// Mock data for testing the Grid component
const mockCertificates: Certificate[] = [
  {
    label: "AWS Certified Solutions Architect",
    imageSrc: "/img/certs/aws-sa.png", // Using a placeholder path
    text: "Validates ability to design and deploy well-architected solutions on AWS.",
    href: "https://www.credly.com/badges/123",
  },
  {
    label: "Microsoft Certified: Azure Administrator",
    imageSrc: "/img/certs/azure-admin.png",
    text: "Validates expertise in implementing, managing, and monitoring an organization’s Microsoft Azure environment.",
    href: "https://www.credly.com/badges/456",
  },
  {
    label: "Google Cloud Professional Cloud Architect",
    imageSrc: "/img/certs/gcp-pca.png",
    text: "Enables professionals to design, develop, and manage robust, secure, scalable, and dynamic solutions.",
    href: "https://www.credly.com/badges/789",
  },
]

describe("Grid Component", () => {
  it("renders the correct number of certificate tiles", () => {
    render(<Grid items={mockCertificates} />)
    // Each tile is a link, so we can count the number of links rendered.
    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(mockCertificates.length)
  })

  it("displays the content for each certificate correctly", () => {
    render(<Grid items={mockCertificates} />)

    // Check that the content for the first certificate is present.
    expect(
      screen.getByText("AWS Certified Solutions Architect"),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Validates ability to design and deploy well-architected solutions on AWS.",
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText("AWS Certified Solutions Architect logo"),
    ).toBeInTheDocument()
  })

  it("links to the correct external URL and opens in a new tab", () => {
    render(<Grid items={mockCertificates} />)

    // Get the link for the second certificate by its text content.
    const link = screen.getByRole("link", {
      name: /Microsoft Certified: Azure Administrator/i,
    })

    // Assert that the href and target attributes are correct.
    expect(link).toHaveAttribute("href", "https://www.credly.com/badges/456")
    expect(link).toHaveAttribute("target", "certificate")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders nothing if the items array is empty", () => {
    render(<Grid items={[]} />)
    // queryAllByRole returns an empty array if no elements are found, unlike getAllByRole which would throw an error.
    const links = screen.queryAllByRole("link")
    expect(links).toHaveLength(0)
  })
})
