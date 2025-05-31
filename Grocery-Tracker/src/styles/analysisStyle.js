import { StyleSheet } from 'react-native';

export const analysisStyles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden'
  },
  periodSelector: {
    margin: 10,
  },
  selectedButton: {
    backgroundColor: 'rgba(81,241,91,0.38)',
  },
  unselectedButton: {
    backgroundColor: '#ffffff',
  },
  selectedLabel: {
    color: '#000000',
  },
  unselectedLabel: {
    color: '#000000',
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0088FE'
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
  },
  noDataContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});