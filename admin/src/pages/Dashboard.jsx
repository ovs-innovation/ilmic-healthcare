import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  FiCheck,
  FiUser,
  FiMessageCircle,
  FiMail,
  FiShoppingBag,
  FiCreditCard,
  FiClock,
  FiTruck,
} from "react-icons/fi";

//internal import
import useAsync from "@/hooks/useAsync";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import LeadServices from "@/services/LeadServices";
import AnimatedContent from "@/components/common/AnimatedContent";

const Dashboard = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);

  // Lead statistics
  const { data: dashboardLeadCount, loading: loadingLeadCount } = useAsync(
    LeadServices.getDashboardCount
  );

  const { data: dashboardLeadData, loading: loadingLeadData } = useAsync(
    LeadServices.getDashboardLeadData
  );

  const { data: dashboardRecentLeads, loading: loadingRecentLeads } = useAsync(
    () => LeadServices.getDashboardRecentLeads({ page: 1, limit: 8 })
  );

  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>

      <AnimatedContent>
        {/* Lead Statistics Section */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 my-8">
          <CardItem
            title="Total Leads"
            Icon={FiUser}
            loading={loadingLeadCount}
            quantity={dashboardLeadCount?.totalLeads || 0}
            className="text-indigo-600 dark:text-indigo-100 bg-indigo-100 dark:bg-indigo-500"
          />
          <CardItem
            title="Pending Leads"
            Icon={FiMessageCircle}
            loading={loadingLeadCount}
            quantity={dashboardLeadCount?.totalPendingLeads || 0}
            className="text-yellow-600 dark:text-yellow-100 bg-yellow-100 dark:bg-yellow-500"
          />
          <CardItem
            title="Contacted Leads"
            Icon={FiMail}
            loading={loadingLeadCount}
            quantity={dashboardLeadCount?.totalContactedLeads || 0}
            className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
          />
          <CardItem
            title="Completed Leads"
            Icon={FiCheck}
            loading={loadingLeadCount}
            quantity={dashboardLeadCount?.totalCompletedLeads || 0}
            className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
          />
        </div>

        {/* Lead Count Overview Cards */}
        <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
          <CardItemTwo
            mode={mode}
            title="Today Leads"
            Icon={FiUser}
            price={dashboardLeadData?.todayLeads || 0}
            className="text-white dark:text-purple-100 bg-purple-600"
            loading={loadingLeadData}
          />
          <CardItemTwo
            mode={mode}
            title="Yesterday Leads"
            Icon={FiUser}
            price={dashboardLeadData?.yesterdayLeads || 0}
            className="text-white dark:text-orange-100 bg-orange-500"
            loading={loadingLeadData}
          />
          <CardItemTwo
            mode={mode}
            title="This Month Leads"
            Icon={FiUser}
            price={dashboardLeadData?.thisMonthLeads || 0}
            className="text-white dark:text-pink-100 bg-pink-500"
            loading={loadingLeadData}
          />
          <CardItemTwo
            mode={mode}
            title="Last Month Leads"
            Icon={FiUser}
            price={dashboardLeadData?.lastMonthLeads || 0}
            className="text-white dark:text-teal-100 bg-cyan-600"
            loading={loadingLeadData}
          />
          <CardItemTwo
            mode={mode}
            title="All Time Leads"
            Icon={FiUser}
            price={dashboardLeadData?.allTimeLeads || 0}
            className="text-white dark:text-green-100 bg-green-600"
            loading={loadingLeadData}
          />
        </div>
      </AnimatedContent>

      {/* Recent Leads Section */}
      <PageTitle>Recent Leads</PageTitle>

      {loadingRecentLeads ? (
        <TableLoading row={5} col={5} />
      ) : dashboardRecentLeads?.leads?.length > 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </tr>
            </TableHeader>
            <tbody>
              {dashboardRecentLeads.leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-blue-50 dark:hover:bg-gray-700">
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        lead.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : lead.status === "contacted"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "in_progress"
                          ? "bg-purple-100 text-purple-800"
                          : lead.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : lead.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {(lead.status || "pending").charAt(0).toUpperCase() +
                        (lead.status || "pending").slice(1).replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleString()}
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={dashboardRecentLeads?.totalLeads || 0}
              resultsPerPage={8}
              onChange={(page) => {
                // Handle pagination if needed
              }}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no leads right now." />
      )}
    </>
  );
};

export default Dashboard;
